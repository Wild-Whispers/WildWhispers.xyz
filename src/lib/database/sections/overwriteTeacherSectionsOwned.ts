import { StudentSection } from "@/_Interfaces/StudentSection";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function overwriteTeacherSectionsOwned(teacherID: Teacher["uid"], sectionIDs: Array<StudentSection["id"]>): Promise<Teacher | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Teacher>("teachers")
        .findOneAndUpdate(
            { uid: teacherID },
            {
                $set: { sections: sectionIDs }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0, password: 0 }
            }
        );
}