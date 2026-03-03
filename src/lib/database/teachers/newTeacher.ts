import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function newTeacher(teacher: Teacher): Promise<Teacher | null> {
    const mongo = getMongo();

    const { password, created_timestamp, ...updateData } = teacher;

    return await mongo.database
        .collection<Teacher>("teachers")
        .findOneAndUpdate(
            { uid: updateData.uid },
            {
                $setOnInsert: { password, created_timestamp },
                $set: { ...updateData as Teacher },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}