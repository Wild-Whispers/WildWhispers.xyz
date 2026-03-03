import { StudentSection } from "@/_Interfaces/StudentSection";
import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function appendStudentsToStudentSection(sectionID: StudentSection["id"], students: Array<Student["uid"]>): Promise<StudentSection | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<StudentSection>("sections")
        .findOneAndUpdate(
            { id: sectionID },
            {
                $addToSet: {
                    members: { $each: students }
                }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}