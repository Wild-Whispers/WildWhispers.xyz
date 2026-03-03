import { ProblemDirectory } from "@/_Interfaces/ProblemDirectory";
import { StudentSection } from "@/_Interfaces/StudentSection";
import { getMongo } from "@/lib/mongo/getmongo";

export async function overwriteStudentSectionFolders(sectionID:StudentSection["id"], folderIDs: Array<ProblemDirectory["id"]>): Promise<ProblemDirectory | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<ProblemDirectory>("sections")
        .findOneAndUpdate(
            { id: sectionID },
            {
                $set: { directories: folderIDs }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}