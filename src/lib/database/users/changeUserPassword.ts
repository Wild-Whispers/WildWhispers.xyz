import { UserTypes } from "@/_Enums/UserTypes";
import { HashPass } from "@/_Helpers/Auth/HashPass";
import { VerifyPass } from "@/_Helpers/Auth/VerifyPass";
import { FetchUser } from "@/_Helpers/FetchUser";
import { ActionReturnBase } from "@/_Interfaces/ActionReturnBase";
import { PasswordHash } from "@/_Interfaces/Auth/PasswordHash";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Student } from "@/_Interfaces/Users/Student";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { getMongo } from "@/lib/mongo/getmongo";

export async function changeUserPassword(uid: string, password: string, newPassword: string): Promise<ActionReturnBase> {
    const mongo = getMongo();

    // Verify user exists
    const { user, type: userType } = await FetchUser(uid);

    if (!user || !user.password) return {
        success: false,
        msg: "Unable to change password: The provided user does not exist."
    };

    // Verify current password matches
    if (!await VerifyPass(password, user.password as PasswordHash)) return {
        success: false,
        msg: `Unable to change password: The entered password is incorrect! Please try again.`
    };

    const newPasswordHash = await HashPass(newPassword);

    let result: Admin | Teacher | Student | null = null;
    switch (userType) {
        case UserTypes.SUPER_ADMIN:
             result = await mongo.database
                .collection<Admin>("admins")
                .findOneAndUpdate(
                    { uid },
                    {
                        $set: { password: newPasswordHash }
                    },
                    {
                        upsert: true,
                        returnDocument: "after",
                        projection: { _id: 0 }
                    }
                );
            break;
        case UserTypes.ADMIN:
            result = await mongo.database
                .collection<Admin>("admins")
                .findOneAndUpdate(
                    { uid },
                    {
                        $set: { password: newPasswordHash }
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
                        $set: { password: newPasswordHash }
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
                        $set: { password: newPasswordHash }
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
        msg: `Unable to change password: The provided user does not exist.`
    };

    return {
        success: true,
        data: {
            user: result,
            userType
        }
    };
}