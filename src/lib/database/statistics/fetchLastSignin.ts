import { UserTypes } from "@/_Enums/UserTypes";
import { SigninStatus } from "@/_Interfaces/SigninStatus";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Student } from "@/_Interfaces/Users/Student";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function fetchLastSignin(uid: Admin["uid"] | Teacher["uid"] | Student["uid"], userType: UserTypes): Promise<SigninStatus | null> {
    const mongo = getMongo();

    return await mongo.database
        .collection<SigninStatus>("signin-status")
        .findOne({ uid, userType }, { projection: { _id: 0 } });
}