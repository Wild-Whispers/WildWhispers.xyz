import { ReactNode } from "react";
import Row from "../Row";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function NavbarUserBox({ children, href }: { children: ReactNode, href?: string }) {
    if (href && href.trim().length > 0) return (
        <Link
            href={href}
            className="
                flex
                flex-row
                items-center
                p-0.75
                px-4

                bg-gradient-to-br
                from-indigo-500
                to-indigo-700
                hover:from-indigo-600
                hover:to-indigo-500

                border-1
                border-indigo-50/20

                text-md
                font-semibold
                rounded-sm
                cursor-pointer
                gap-2
            "
        >
            <UserCircleIcon className="w-5 h-5"/>
            {children}
        </Link>
    );

    return (
        <Row
            classes="
                flex
                flex-row
                items-center
                p-0.75
                px-4

                bg-gradient-to-br
                from-indigo-500
                to-indigo-700

                border-1
                border-indigo-50/20

                text-md
                font-semibold
                rounded-sm
                gap-2
            "
        >
            <UserCircleIcon className="w-5 h-5"/>
            {children}
        </Row>
    );
}