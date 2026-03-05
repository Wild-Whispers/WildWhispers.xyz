"use client";

import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "@/components/Messages/ErrorMessage";
import SuccessMessage from "@/components/Messages/SuccessMessage";
import FormSubmitButton from "@/components/Buttons/FormSubmitButton";
import Col from "@/components/Col";
import InputText from "@/components/Inputs/InputText";
import InputTextarea from "@/components/Inputs/InputTextarea";
import GuildIconHandler from "./GuildIconHandler";
import { CreateGuildAction } from "@/_Actions/Guilds/CreateGuildAction";
import Row from "@/components/Row";

export default function CreateGuildForm() {
    const [serverState, action] = useActionState(CreateGuildAction, {
        success: false
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [nameLength, updateNameLength] = useState<number>(0);
    const [bioLength, updateBioLength] = useState<number>(0);
    const [descriptionLength, updateDescriptionLength] = useState<number>(0);

    useEffect(() => {
        if (serverState.success) setSuccess(serverState.msg!);
        else setError(serverState.msg!);
    }, [serverState]);

    return (
        <form
            action={action}
            onClick={(e) => e.stopPropagation()} // Prevents event bubbling
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 999
            }}
            className="
                flex
                flex-col
                justify-between
                w-1/3
                min-h-2/3
                p-2
                px-4

                bg-slate-900

                border-2
                border-fuchsia-800

                rounded-md

                gap-2
            "
        >
            <Col
                id="form-title"
                className="items-center"
            >
                <h2 className="text-lg font-semibold">Create A New Guild</h2>
            </Col>

            <Col
                id="form-inputs"
                className="items-center gap-2"
            >
                <Col className="w-full">
                    <GuildIconHandler setError={setError} />
                </Col>

                <Col className="w-full">
                    <label htmlFor="guild-name">Guild Name (required)</label>
                    <InputText
                        id="guild-name"
                        name="guild-name"
                        maxLength={32}
                        minLength={5}
                        onChange={(e) => updateNameLength(e.target.value.length)}
                        required
                    />
                    <Row>
                        <p className={`text-xs font-semibold ${nameLength < 5 ? "text-red-500/50" : "text-slate-50/50"}`}>{nameLength} / {32}</p>
                    </Row>
                </Col>

                <Col className="w-full">
                    <label htmlFor="guild-bio">Guild Bio</label>
                    <InputTextarea 
                        id="guild-bio"
                        name="guild-bio"
                        maxLength={64}
                        rows={3}
                        onChange={(e) => updateBioLength(e.target.value.length)}
                        className="resize-none"
                    />
                    <Row>
                        <p className="text-xs font-semibold text-slate-50/50">{bioLength} / {64}</p>
                    </Row>
                </Col>

                <Col className="w-full">
                    <label htmlFor="guild-description">Guild Description (required)</label>
                    <InputTextarea 
                        id="guild-description"
                        name="guild-description"
                        maxLength={512}
                        minLength={10}
                        rows={7}
                        onChange={(e) => updateDescriptionLength(e.target.value.length)}
                        className="resize-none"
                        required
                    />
                    <Row>
                        <p className={`text-xs font-semibold ${descriptionLength < 10 ? "text-red-500/50" : "text-slate-50/50"}`}>{descriptionLength} / {512}</p>
                    </Row>
                </Col>
            </Col>

            <Col
                id="form-buttons"
                className="items-center gap-2"
            >
                <Col className="w-full">
                    {
                        error && <ErrorMessage description={error} />
                    }

                    {
                        success && <SuccessMessage description={success} />
                    }
                </Col>

                <FormSubmitButton>Create Guild</FormSubmitButton>
            </Col>
        </form>
    );
}