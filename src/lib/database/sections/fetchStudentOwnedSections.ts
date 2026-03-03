import { StudentSection } from "@/_Interfaces/StudentSection";
import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchStudentOwnedSections(studentID: Student["uid"]): Promise<Array<StudentSection> | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<StudentSection>("sections")
        .find({ members: studentID }, { projection: { _id: 0 } })
        .toArray();
}