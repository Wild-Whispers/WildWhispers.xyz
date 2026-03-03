import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllProblems(): Promise<Array<Problem> | null> {
    const mongo = getMongo();

    const result = await mongo.database
        .collection<Problem>("problems")
        .find({}, { projection: { _id: 0 } })
        .toArray();

    if (result.length > 0) return result as Array<Problem>;

    return null;
}