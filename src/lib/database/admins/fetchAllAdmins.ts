import { Admin } from "@/_Interfaces/Users/Admin";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllAdmins(): Promise<Array<Admin> | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Admin>("admins")
        .find({}, { projection: { _id: 0, password: 0 } })
        .toArray();
}