import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllStudents(): Promise<Array<Student>> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Student>("students")
        .find({}, { projection: { _id: 0, password: 0 } })
        .toArray();
}