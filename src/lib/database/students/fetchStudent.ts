import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchStudent(uid: string): Promise<Student | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Student>("students")
        .findOne({ uid }, { projection: { _id: 0 } });
}