import React, { ReactNode } from "react";
import Row from "../Row";

export default function InputRadioDisabled({ label, name, checked }: { label: ReactNode, name: string, checked: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Row classes="items-center gap-2 pointer-events-none">
            <input
                className="
                    p-1

                    outline-none
                    border-1
                    border-slate-50/20
                    focus:border-slate-50

                    text-md
                    rounded-sm
                "
                type="radio"
                name={name}
                tabIndex={-1}
                defaultChecked={checked}
                readOnly
            />
            <label className="text-md">{label}</label>
        </Row>
    );
}