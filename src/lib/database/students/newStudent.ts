import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function newStudent(student: Student): Promise<Student | null> {
    const mongo = getMongo();

    const { password, created_timestamp, ...updateData } = student;

    return await mongo.database
        .collection<Student>("students")
        .findOneAndUpdate(
            { uid: updateData.uid },
            {
                $setOnInsert: { password, created_timestamp },
                $set: { ...updateData as Student },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}