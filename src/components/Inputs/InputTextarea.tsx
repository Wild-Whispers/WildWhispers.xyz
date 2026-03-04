"use client";

export default function InputTextarea({ classes, ...props }: { classes?: string } & React.InputHTMLAttributes<HTMLTextAreaElement>) {
    return (
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
    );
}