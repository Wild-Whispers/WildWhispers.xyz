import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchGradedSubmission(submission_id: string): Promise<Problem | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Problem>("submissions")
        .findOne({ submission_id }, { projection: { _id: 0 } }) as Problem | null;
}