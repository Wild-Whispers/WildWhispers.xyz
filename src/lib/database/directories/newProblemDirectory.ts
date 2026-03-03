import { ProblemDirectory } from "@/_Interfaces/ProblemDirectory";
import { Problem } from "@/_Interfaces/Problems/Problem";
import { safeUUID } from "@/lib/crypto/crypto";
import { getMongo } from "@/lib/mongo/getmongo";

export async function newProblemDirectory(name: string, problems?: Array<Problem["id"]>) {
    const mongo = getMongo();

    const problemsArray = (problems && problems.length > 0) ? problems : [];

    const dir: ProblemDirectory = {
        id: safeUUID(),
        name: name,
        problems: problemsArray
    };

    return await mongo.database
        .collection("directories")
        .findOneAndUpdate(
            { name },
            { $setOnInsert: dir },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}