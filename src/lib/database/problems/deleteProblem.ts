import { Problem } from "@/_Interfaces/Problems/Problem";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteProblem(problemID: Problem["id"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection("problems")
        .deleteOne({ id: problemID })
}