import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchStudentCount() {
    const mongo = getMongo();

    return await mongo.database.collection("admins").countDocuments({});
}