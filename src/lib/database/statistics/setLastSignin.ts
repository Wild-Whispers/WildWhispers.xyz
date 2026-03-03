import { UserTypes } from "@/_Enums/UserTypes";
import { SigninStatus } from "@/_Interfaces/SigninStatus";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Student } from "@/_Interfaces/Users/Student";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function setLastSignin(uid: Admin["uid"] | Teacher["uid"] | Student["uid"], userType: UserTypes, passwordChanged?: boolean): Promise<SigninStatus | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<SigninStatus>("signin-status")
        .findOneAndUpdate(
            { uid, userType },
            {
                $set: { uid, userType, password_changed: passwordChanged },
                $setOnInsert: { last_signin: Date.now() }
            },
            {
                upsert: true,
                returnDocument: "after",
                projection: { _id: 0 }
            }
        );
}