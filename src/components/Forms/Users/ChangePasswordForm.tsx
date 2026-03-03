"use client";

import { useActionState, useEffect, useState } from "react";
import FormSectionCol from "./FormSectionCol";
import InputPasswordMain from "../Inputs/InputPasswordMain";
import FormSectionRow from "./FormSectionRow";
import FormRawSubmitButton from "../Buttons/FormRawSubmitButton";
import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import { ChangePasswordAction } from "@/_Actions/Account/ChangePasswordAction";
import { useRouter } from "next/navigation";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { Student } from "@/_Interfaces/Users/Student";

export default function ChangePasswordForm({ user, visible }: { user: Admin | Teacher | Student, visible: boolean }) {
    const [changePasswordState, action] = useActionState(ChangePasswordAction, {
        success: false
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (changePasswordState.success) {
            setSuccess(changePasswordState.msg!);

            const timer = setTimeout(() => {
                router.push(`/data/account/${user.uid}`);
            }, 3000);

            return () => clearTimeout(timer);
        } else setError(changePasswordState.msg!);
    }, [changePasswordState, router, user]);

    return (
        <form action={action} className={`${visible ? "" : "hidden"}`}>
            <h2 className="text-lg font-semibold">Change Your Password</h2>

            {
                error && <ErrorMessage description={error} />
            }

            {
                success && <SuccessMessage description={success} />
            }

            <FormSectionCol>
                <input type="hidden" name="uid" value={user.uid} />
                <InputPasswordMain label="Enter your old password" name="oldPassword" required />
                <InputPasswordMain label="Enter your new desired password" name="newPassword" required />
            </FormSectionCol>
            
            <FormSectionRow classes="pt-2 pb-2">
                <FormRawSubmitButton>Change Password</FormRawSubmitButton>
            </FormSectionRow>
        </form>
    );
}