import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NavbarButtonSignout({ text, href }: { text: string, href: string }) {
    return (
        <Link
            className="
                flex
                flex-row
                items-center
                p-2
                px-4

                bg-gradient-to-br
                from-amber-500
                to-amber-700
                hover:from-amber-600
                hover:to-amber-500

                border-1
                border-amber-50/20

                text-sm
                font-semibold
                rounded-sm
                cursor-pointer

                gap-1
            "
            href={href}
        >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5"/>
            {text}
        </Link>
    );
}