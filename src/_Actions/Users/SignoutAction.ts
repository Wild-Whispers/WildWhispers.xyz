"use server";

import { ActionReturnBase } from "@/_Interfaces/ActionReturnBase";
import { cookies } from "next/headers";

export async function SignoutAction(): Promise<ActionReturnBase> {
    (await cookies()).delete("user");

    return {
        success: true
    };
}