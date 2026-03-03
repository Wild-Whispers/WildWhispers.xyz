import { ProblemDirectory } from "@/_Interfaces/ProblemDirectory";
import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function overwriteDirectoryProblems(directoryID: ProblemDirectory["id"], problemIDs: Array<Problem["id"]>): Promise<Problem | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Problem>("directories")
        .findOneAndUpdate(
            { id: directoryID },
            {
                $set: { problems: problemIDs }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}