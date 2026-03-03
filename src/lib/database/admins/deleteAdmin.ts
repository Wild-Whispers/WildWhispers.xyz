import { Admin } from "@/_Interfaces/Users/Admin";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteAdmin(uid: Admin["uid"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<Admin>("admins")
        .findOneAndDelete({ uid });
}