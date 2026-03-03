import { ProblemDirectory } from "@/_Interfaces/ProblemDirectory";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllProblemDirectories(): Promise<Array<ProblemDirectory> | null> {
    const mongo = getMongo();

    const result = await mongo.database
        .collection<ProblemDirectory>("directories")
        .find({}, { projection: { _id: 0 } })
        .toArray();

    if (result.length > 0) return result as Array<ProblemDirectory>;

    return null;
}