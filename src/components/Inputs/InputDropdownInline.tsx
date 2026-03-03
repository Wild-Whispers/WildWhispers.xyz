"use client";

import { ReactNode, SelectHTMLAttributes } from "react";

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
    children: ReactNode;
};

export default function InputDropdownInline(props: DropdownProps) {
    return (
        <select
            className="
                min-w-20
                p-1

                focus:bg-slate-700

                outline-none
                border-1
                border-slate-50/20
                focus:border-slate-50

                text-md
                rounded-sm
            "
            {...props}
        >
            {props.children}
        </select>
    );
}