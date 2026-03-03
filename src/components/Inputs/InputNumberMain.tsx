import { ReactNode } from "react";
import Col from "../Col";

export default function InputNumberMain({ label, ...props }: { label: ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Col classes="w-full gap-0.5">
            <label className="text-xs">{label}</label>
            <input
                className="
                    w-full
                    p-1

                    outline-none
                    border-1
                    border-slate-50/20
                    focus:border-slate-50

                    text-md
                    rounded-sm
                "
                type="number"
                {...props}
            />
        </Col>
    );
}