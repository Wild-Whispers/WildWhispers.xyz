import { Admin } from "@/_Interfaces/Users/Admin";
import { getMongo } from "@/lib/mongo/getmongo";

export async function newAdmin(admin: Admin): Promise<Admin | null> {
    const mongo = getMongo();

    const { password, created_timestamp, ...updateData } = admin;

    return await mongo.database
        .collection<Admin>("admins")
        .findOneAndUpdate(
            { uid: updateData.uid },
            {
                $setOnInsert: { password, created_timestamp },
                $set: { ...updateData as Admin },
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}