import { ReactNode } from "react";
import Row from "../Row";

export default function InputCheckbox({ label, ...props }: { label: ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Row classes="items-center gap-2">
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
                type="checkbox"
                {...props}
            />
            <label className="text-md">{label}</label>
        </Row>
    );
}