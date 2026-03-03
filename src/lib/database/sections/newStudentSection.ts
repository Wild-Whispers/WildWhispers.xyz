import { StudentSection } from "@/_Interfaces/StudentSection";
import { safeUUID } from "@/lib/crypto/crypto";
import { getMongo } from "@/lib/mongo/getmongo";

export async function newStudentSection(section: StudentSection) {
    const mongo = getMongo();

    // Generate unique ID
    const id = safeUUID();

    return await mongo.database
        .collection("sections")
        .updateOne(
            { name: section.name },
            {
                $setOnInsert: { id, name: section.name },
                $addToSet: { 
                    members: { $each: section.members },
                    directories: { $each: section.directories }
                },
            },
            {
                upsert: true
            }
        );
}