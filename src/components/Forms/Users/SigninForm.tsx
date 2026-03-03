"use client";

import FormResetButton from "../Buttons/FormResetButton";
import FormSubmitButton from "../Buttons/FormSubmitButton";
import InputTextMain from "../Inputs/InputTextMain";
import FormSectionCol from "./FormSectionCol";
import FormSectionRow from "./FormSectionRow";
import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "../Messages/ErrorMessage";
import { useRouter } from "next/navigation";
import InputDropdown from "../Inputs/InputDropdown";
import { UserTypes } from "@/_Enums/UserTypes";
import { SigninAction } from "@/_Actions/SigninAction";
import InputPasswordMain from "../Inputs/InputPasswordMain";

export default function SigninForm() {
    const [serverState, action] = useActionState(SigninAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (serverState.success) {
            if (serverState.requiresPasswordReset) {
                setError("You have not signed in before. You must change your password. Redirecting, please wait...");

                const timer = setTimeout(() => {
                    router.push("/data/account/change-password");
                }, 3000);

                return () => clearTimeout(timer);
            }

            if (serverState.data.type === UserTypes.SUPER_ADMIN || serverState.data.type === UserTypes.ADMIN) router.push("/data/dashboard");
            if (serverState.data.type === UserTypes.TEACHER || serverState.data.type === UserTypes.STUDENT) router.push("/data/dashboard/sections/owned");
        } else setError(serverState.msg!);
    }, [serverState, router]);

    return (
        <form action={action} className="flex flex-col items-center w-full">
            <FormSectionCol classes="max-w-1/2">

                {
                    error && <ErrorMessage description={error} />
                }

                <FormSectionCol>
                    <InputDropdown
                        label="User Type"
                        name="type"
                        required
                    >
                        <option value={UserTypes.STUDENT}>{UserTypes.STUDENT}</option>
                        <option value={UserTypes.TEACHER}>{UserTypes.TEACHER}</option>
                        <option value={UserTypes.ADMIN}>{UserTypes.ADMIN}</option>
                    </InputDropdown>
                </FormSectionCol>

                <FormSectionCol>
                    <InputTextMain label="Username" name="username" placeholder="JohnDoe" required />
                </FormSectionCol>

                <FormSectionCol>
                    <InputPasswordMain label="Password" name="password" required />
                </FormSectionCol>

                <FormSectionRow>
                    <FormResetButton />
                    <FormSubmitButton>Sign In</FormSubmitButton>
                </FormSectionRow>

            </FormSectionCol>
        </form>
    );
}