"use server";

import { UserTypes } from "@/_Enums/UserTypes";
import { ActionReturnBase } from "@/_Interfaces/ActionReturnBase";
import { UserCookie } from "../SigninAction";
import { cookies } from "next/headers";
import { changeUserUsername } from "@/lib/database/users/changeUserUsername";
import { Student } from "@/_Interfaces/Users/Student";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { Admin } from "@/_Interfaces/Users/Admin";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function ChangeUsernameAction(prevState: any, data: FormData): Promise<ActionReturnBase> {
    const uid = data.get("uid") as string;
    const newUsername = data.get("newUsername") as string;
    const password = data.get("password") as string;

    // Attempt to change the user's username (includes verification)
    const { success, msg, data: { user, userType } } = await changeUserUsername(uid, password, newUsername);

    if (!success) return { success, msg };

    const newUser = user as Admin | Teacher | Student;
    const newUserType = userType as UserTypes;

    // Check if the user is super admin
    const userIsSuperAdmin = newUserType === UserTypes.ADMIN && (newUser as Admin).super;

    // Set cookies to sign in
    delete user.password;
    const userData: UserCookie = {
        data: user,
        type: userIsSuperAdmin ? UserTypes.SUPER_ADMIN : newUserType
    };

    const isDev = process.env.NODE_ENV === "development";

    (await cookies()).set("user", JSON.stringify(userData), {
        httpOnly: false,
        secure: !isDev,
        sameSite: isDev ? "lax" : "strict",
        maxAge: 60 * 60 * 24 * 0.5, // 12 hours
        path: "/",
    });

    return {
        success: true,
        msg: "You have successfully changed your username! Please wait a moment...",
        data: userData
    };
}