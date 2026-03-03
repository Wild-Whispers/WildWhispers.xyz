import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllTeachers(): Promise<Array<Teacher> | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Teacher>("teachers")
        .find({}, { projection: { _id: 0, password: 0 } })
        .toArray();
}