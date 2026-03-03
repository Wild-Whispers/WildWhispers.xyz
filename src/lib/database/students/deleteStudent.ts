import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteStudent(uid: Student["uid"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<Student>("students")
        .findOneAndDelete({ uid });
}