import { ProblemDirectory } from "@/_Interfaces/ProblemDirectory";
import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function addProblemsToDirectory(directoryName: ProblemDirectory["name"], problems: Array<Problem["id"]>) {
    const mongo = getMongo();

    return await mongo.database
        .collection("directories")
        .findOneAndUpdate(
            { name: directoryName },
            {
                $addToSet: { problems: { $each: problems } }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}