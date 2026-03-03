import { UserTypes } from "@/_Enums/UserTypes";
import { VerifyPass } from "@/_Helpers/Auth/VerifyPass";
import { FetchUser } from "@/_Helpers/FetchUser";
import { ActionReturnBase } from "@/_Interfaces/ActionReturnBase";
import { PasswordHash } from "@/_Interfaces/Auth/PasswordHash";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Student } from "@/_Interfaces/Users/Student";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function changeUserUsername(uid: string, password: string, newUsername: string): Promise<ActionReturnBase> {
    const mongo = getMongo();

    // Verify user exists
    const { user, type: userType } = await FetchUser(uid);

    if (!user || !user.password) return {
        success: false,
        msg: "Unable to change username: The provided user does not exist."
    };

    // Verify password matches
    if (!await VerifyPass(password, user.password as PasswordHash)) return {
        success: false,
        msg: `Unable to change username: The entered password is incorrect! Please try again.`
    };

    let result: Admin | Teacher | Student | null = null;
    switch (userType) {
        case UserTypes.SUPER_ADMIN || userType === UserTypes.ADMIN:
            result = await mongo.database
                .collection<Admin>("admins")
                .findOneAndUpdate(
                    { uid },
                    {
                        $set: { username: newUsername }
                    },
                    {
                        upsert: true,
                        returnDocument: "after",
                        projection: { _id: 0 }
                    }
                );
            break;
        case UserTypes.TEACHER:
            result = await mongo.database
                .collection<Teacher>("teachers")
                .findOneAndUpdate(
                    { uid },
                    {
                        $set: { username: newUsername }
                    },
                    {
                        upsert: true,
                        returnDocument: "after",
                        projection: { _id: 0 }
                    }
                );
            break;
        case UserTypes.STUDENT:
            result = await mongo.database
                .collection<Student>("students")
                .findOneAndUpdate(
                    { uid },
                    {
                        $set: { username: newUsername }
                    },
                    {
                        upsert: true,
                        returnDocument: "after",
                        projection: { _id: 0 }
                    }
                );
            break;
        default:
            break;
    }

    if (!result) return {
        success: false,
        msg: `Unable to change username: The provided user does not exist.`
    };

    return {
        success: true,
        data: {
            user: result,
            userType
        }
    };
}