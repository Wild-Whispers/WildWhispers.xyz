import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NavbarButtonSignin({ text, href }: { text: string, href: string }) {
    return (
        <Link
            className="
                flex
                flex-row
                items-center
                p-2
                px-4

                bg-gradient-to-br
                from-emerald-500
                to-emerald-700
                hover:from-emerald-600
                hover:to-emerald-500

                border-1
                border-emerald-50/20

                text-sm
                font-semibold
                rounded-sm
                cursor-pointer

                gap-1
            "
            href={href}
        >
            <ArrowRightEndOnRectangleIcon className="w-5 h-5"/>
            {text}
        </Link>
    );
}