import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function newProblem(problem: Problem) {
    const mongo = getMongo();

    return await mongo.database
        .collection("problems")
        .insertOne({ ...problem });
}