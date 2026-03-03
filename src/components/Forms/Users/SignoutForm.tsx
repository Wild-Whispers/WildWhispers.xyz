"use client";

import FormSubmitButton from "../Buttons/FormSubmitButton";
import FormSectionCol from "./FormSectionCol";
import FormSectionRow from "./FormSectionRow";
import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "../Messages/ErrorMessage";
import { useRouter } from "next/navigation";
import FormActionButton from "../Buttons/FormActionButton";
import { SignoutAction } from "@/_Actions/SignoutAction";
import SuccessMessage from "../Messages/SuccessMessage";

export default function SignoutForm() {
    const [serverState, action] = useActionState(SignoutAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }

        if (serverState.success) setSuccess(true);
    }, [serverState, router]);

    return (
        <form action={action}>
            <FormSectionCol classes="justify-center items-center">

                {
                    error && <ErrorMessage description={error} />
                }

                {
                    success && <SuccessMessage description="You have been successfully signed out. Please wait..." />
                }

                <FormSectionRow classes="justify-center items-center">
                    <FormSubmitButton>Yes</FormSubmitButton>
                    <FormActionButton onClick={() => router.back()}>No, take me back</FormActionButton>
                </FormSectionRow>

            </FormSectionCol>
        </form>
    );
}