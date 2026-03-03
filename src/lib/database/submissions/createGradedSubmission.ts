import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function createGradedSubmission(gradedProblem: Problem): Promise<Problem | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Problem>("submissions")
        .findOneAndReplace(
            { submission_id: gradedProblem.submission_id },
            {
                ...gradedProblem
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}