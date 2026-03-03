import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchTeacher(uid: string): Promise<Teacher | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Teacher>("teachers")
        .findOne({ uid }, { projection: { _id: 0 } });
}