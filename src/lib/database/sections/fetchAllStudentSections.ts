import { StudentSection } from "@/_Interfaces/StudentSection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchAllStudentSections(): Promise<Array<StudentSection>> {
    const mongo = getMongo();

    return await mongo.database
        .collection<StudentSection>("sections")
        .find({}, { projection: { _id: 0 } })
        .toArray();
}