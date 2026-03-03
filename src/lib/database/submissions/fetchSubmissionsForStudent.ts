import { Problem } from "@/_Interfaces/Problems/Problem";
import { Student } from "@/_Interfaces/Users/Student";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchSubmissionsForStudent(studentID: Student["uid"]): Promise<Array<Problem> | null> {
    const mongo = getMongo();
    
        const result = await mongo.database
            .collection<Problem>("students")
            .aggregate([
                { $match: { uid: studentID } },
                {
                    $lookup: {
                        from: "submissions",
                        localField: "submissions",
                        foreignField: "submission_id",
                        as: "matched_problems"
                    }
                },
                { $project: { _id: 0, matched_problems: 1 } }
            ])
            .toArray();
    
        if (!result || result.length === 0) return null;
    
        return result[0].matched_problems;
}