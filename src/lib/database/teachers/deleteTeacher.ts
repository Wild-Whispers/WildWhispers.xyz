import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function deleteTeacher(uid: Teacher["uid"]) {
    const mongo = getMongo();

    return await mongo.database
        .collection<Teacher>("teachers")
        .findOneAndDelete({ uid });
}