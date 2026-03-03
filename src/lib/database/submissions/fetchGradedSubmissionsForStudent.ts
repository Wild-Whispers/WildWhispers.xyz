import { getMongo } from "@/lib/mongo/getmongo";
import { Problem } from "@/_Interfaces/Problems/Problem";
import { Student } from "@/_Interfaces/Users/Student";

export async function fetchGradedSubmissionsForStudent(uid: Student["uid"]): Promise<Array<Problem> | null> {
    const mongo = getMongo();

    const result = await mongo.database
        .collection<Problem>("students")
        .aggregate([
            { $match: { uid } },
            {
                $lookup: {
                    from: "submissions",
                    let: { student_subs: "$submissions"},
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$submission_id", "$$student_subs"] },
                                graded_by: { $exists: true, $ne: null },
                                graded_timestamp: { $exists: true, $ne: null },
                            }
                        }
                    ],
                    as: "matched_problems"
                }
            },
            { $project: { _id: 0, matched_problems: 1 } }
        ])
        .toArray();

    if (!result || result.length === 0) return null;

    return result[0].matched_problems;
}