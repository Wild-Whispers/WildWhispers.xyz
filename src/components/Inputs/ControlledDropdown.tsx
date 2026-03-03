"use client";

import Col from "@/components/Col";
import { ChangeEventHandler, ReactNode } from "react";

export default function ControlledDropdown(
    {
        name,
        value,
        multiple,
        onChange,
        children
    }:
    {
        name?: string,
        value: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
        multiple?: boolean
        onChange?: ChangeEventHandler<HTMLSelectElement>,
        children: ReactNode
    }
) {
    return (
        <Col classes="gap-0.5">
            <select
                name={name}
                onChange={onChange}
                value={value}
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
                multiple={multiple}
            >
                {children}
            </select>
        </Col>
    );
}