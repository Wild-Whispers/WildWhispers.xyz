import { Admin } from "@/_Interfaces/Users/Admin";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAdmin(uid: string): Promise<Admin | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<Admin>("admins")
        .findOne({ uid }, { projection: { _id: 0 } });
}