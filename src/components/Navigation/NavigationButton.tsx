import { ButtonHTMLAttributes, ReactNode } from "react";

export default function NavigationButton({ children, onClick, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            className="
                flex
                flex-row
                p-0
                px-5

                bg-slate-900

                cursor-pointer
                hover:bg-slate-800

                first:border-r-1
                last:border-l-1

                border-indigo-50/50
            "
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
}