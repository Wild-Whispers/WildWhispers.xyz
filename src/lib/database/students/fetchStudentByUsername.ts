import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchStudentByUsername(username: string): Promise<Student | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Student>("students")
        .findOne({ username }, { projection: { _id: 0 } });
}