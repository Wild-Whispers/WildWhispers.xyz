import { ProblemDirectory } from "@/_Interfaces/ProblemDirectory";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchProblemDirectoryByID(id: string): Promise<ProblemDirectory | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<ProblemDirectory>("directories")
        .findOne({ id }, { projection: { _id: 0 } }) as ProblemDirectory;
}

export async function fetchProblemDirectoryByName(name: string): Promise<ProblemDirectory> {
    const mongo = getMongo();

    return await mongo.database
        .collection<ProblemDirectory>("directories")
        .findOne({ name }, { projection: { _id: 0 } }) as ProblemDirectory;
}