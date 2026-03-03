import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchSubmission(id: string): Promise<Problem> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Problem>("submissions")
        .findOne({ submission_id: id }, { projection: { _id: 0 } }) as Problem;
}