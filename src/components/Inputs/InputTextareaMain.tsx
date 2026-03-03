import { ReactNode } from "react";
import Col from "../Col";

export default function InputTextareaMain({ label, classes, ...props }: { label: ReactNode, classes?: string } & React.InputHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <Col classes="w-full gap-2">
            {label}
            <textarea
                className={`
                    w-full
                    p-1

                    text-md

                    bg-white
                    text-black

                    outline-none
                    border-1
                    border-slate-50/20
                    focus:border-slate-50

                    rounded-sm

                    ${classes}
                `}
                {...props}
            ></textarea>
        </Col>
    );
}