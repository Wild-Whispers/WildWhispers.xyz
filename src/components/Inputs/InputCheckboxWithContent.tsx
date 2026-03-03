import { ReactNode } from "react";
import Row from "../Row";

export default function InputCheckboxWithContent({ children, ...props }: { children: ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
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
            {children}
        </Row>
    );
}