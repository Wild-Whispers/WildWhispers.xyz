"use client";

import { NewUserAction } from "@/_Actions/Users/NewUserAction";
import { MouseEvent, startTransition, useActionState, useEffect, useState } from "react";
import FormSectionCol from "../FormSectionCol";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import FormSectionRow from "../FormSectionRow";
import InputTextMain from "@/components/Inputs/InputTextMain";
import InputPasswordMain from "@/components/Inputs/InputPasswordMain";
import InputCheckbox from "@/components/Inputs/InputCheckbox";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import FormResetButton from "@/components/Buttons/FormResetButton";

export default function NewUserForm() {
    const [serverState, action] = useActionState(NewUserAction, {
        success: false
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!serverState.success && serverState.msg) {
            setError(serverState.msg);
        }
    }, [serverState]);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        const form = e.currentTarget.form;
        
        if (!form || !form.reportValidity()) return;
        
        // Collect the user
        const formData = new FormData(form);
        const rawEntries = Object.fromEntries(formData.entries());

        const normalizedUser = {
            uid: rawEntries.uid,
            first: rawEntries.first,
            last: rawEntries.last,
            username: rawEntries.username,
            email: rawEntries.email,
            password: rawEntries.password,
            repeatedPassword: rawEntries.repeatedPassword,
            super: formData.has("super"),
            prefix: rawEntries.prefix as PersonPrefixes
        } as Admin;

        startTransition(() => action([normalizedUser]));
    };

    return (
        <form>
            <FormSectionCol>

                {
                    error && <ErrorMessage description={error} />
                }

                {
                    serverState.success && <SuccessMessage description="Success!" />
                }

                <FormSectionRow>
                    <FormSectionCol>
                        <InputTextMain label="First Name" name="first" placeholder="John" required />
                    </FormSectionCol>
                    <FormSectionCol>
                        <InputTextMain label="Last Name" name="last" placeholder="Doe" required />
                    </FormSectionCol>
                </FormSectionRow>

                <FormSectionCol>
                    <InputTextMain label="User ID" name="uid" placeholder="1234" required />
                </FormSectionCol>

                <FormSectionCol>
                    <InputTextMain label="Username" name="username" placeholder="JohnDoe" required />
                </FormSectionCol>

                <FormSectionCol>
                    <InputTextMain label="Email Address" name="email" placeholder="johndoe@riverbendschools.net" required />
                </FormSectionCol>

                <FormSectionCol>
                    <InputPasswordMain label="Desired Password" name="password" required />
                </FormSectionCol>

                <FormSectionCol>
                    <InputPasswordMain label="Repeat Password" name="repeatedPassword" required />
                </FormSectionCol>

                <FormSectionCol>
                    <InputCheckbox label="Super Admin?" name="super" />
                </FormSectionCol>

                <FormSectionRow>
                    <FormResetButton />
                    <FormSubmitButton onClick={(e) => handleSubmit(e)}>Create Admin</FormSubmitButton>
                </FormSectionRow>

            </FormSectionCol>
        </form>
    );
}