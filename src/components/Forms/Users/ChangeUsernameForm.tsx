"use client";

import { ChangeUsernameAction } from "@/_Actions/Account/ChangeUsernameAction";
import { useActionState, useEffect, useState } from "react";
import FormSectionCol from "./FormSectionCol";
import InputPasswordMain from "../Inputs/InputPasswordMain";
import InputTextMain from "../Inputs/InputTextMain";
import FormSectionRow from "./FormSectionRow";
import FormRawSubmitButton from "../Buttons/FormRawSubmitButton";
import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import { useRouter } from "next/navigation";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { Student } from "@/_Interfaces/Users/Student";

export default function ChangeUsernameForm({ user, visible }: { user: Admin | Teacher | Student, visible: boolean }) {
    const [changeUsernameState, action] = useActionState(ChangeUsernameAction, {
        success: false
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (changeUsernameState.success) {
            setSuccess(changeUsernameState.msg!);

            const timer = setTimeout(() => {
                router.push(`/data/account/${user.uid}`);
            }, 3000);

            return () => clearTimeout(timer);
        } else setError(changeUsernameState.msg!);
    }, [changeUsernameState, router, user]);

    return (
        <form action={action} className={`${visible ? "" : "hidden"}`}>
            <h2 className="text-lg font-semibold">Change Your Username</h2>

            {
                error && <ErrorMessage description={error} />
            }

            {
                success && <SuccessMessage description={success} />
            }

            <FormSectionCol>
                <input type="hidden" name="uid" value={user.uid} />
                <InputTextMain label="New Desired Username" name="newUsername" placeholder="JohnDoe" required />
                <InputPasswordMain label="Verify Your Password" name="password" required />
            </FormSectionCol>

            <FormSectionRow classes="pt-2 pb-2">
                <FormRawSubmitButton>Change Username</FormRawSubmitButton>
            </FormSectionRow>
        </form>
    );
}