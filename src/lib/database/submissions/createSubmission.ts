import { Problem } from "@/_Interfaces/Problems/Problem";
import { Student } from "@/_Interfaces/Users/Student";
import { safeUUID } from "@/lib/crypto/crypto";
import { getMongo } from "@/lib/mongo/getmongo";

export async function createSubmission(submittedProblem: Problem) {
    const mongo = getMongo();

    const problem = {
        ...submittedProblem,
        submission_id: safeUUID()
    };

    await mongo.database
        .collection<Student>("students")
        .findOneAndUpdate(
            { uid: submittedProblem.submitted_by },
            {
                $addToSet: { submissions: problem.submission_id }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );

    return await mongo.database
        .collection("submissions")
        .insertOne({ ...problem });
}