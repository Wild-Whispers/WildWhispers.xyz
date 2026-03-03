import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchProblem(id: string): Promise<Problem> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Problem>("problems")
        .findOne({ id }, { projection: { _id: 0 } }) as Problem;
}