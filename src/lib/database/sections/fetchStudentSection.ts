import { StudentSection } from "@/_Interfaces/StudentSection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchStudentSection(id: string): Promise<StudentSection | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<StudentSection>("sections")
        .findOne({ id }, { projection: { _id: 0 } });
}