"use client";

import { ReactNode, SelectHTMLAttributes } from "react";
import Col from "../Col";

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: ReactNode,
    children: ReactNode;
};

export default function InputDropdown(props: DropdownProps) {
    return (
        <Col classes="gap-0.5">
            <label className="text-xs">{props.label}</label>
            <select
                className="
                    w-full
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
        </Col>
    );
}