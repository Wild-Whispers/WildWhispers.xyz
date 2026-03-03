import { StudentSection } from "@/_Interfaces/StudentSection";
import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function removeStudentFromStudentSection(sectionID: StudentSection["id"], studentID: Student["uid"]): Promise<StudentSection | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<StudentSection>("sections")
        .findOneAndUpdate(
            { id: sectionID },
            {
                $pull: { members: studentID }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}