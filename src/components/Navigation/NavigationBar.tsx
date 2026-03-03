"use client";

import { useRouter } from "next/navigation";
import Row from "../Row";
import NavigationButton from "./NavigationButton";

export default function NavigationBar() {
    const router = useRouter();

    return (
        <Row
            classes="
                w-full
                flex-wrap
                justify-between

                border-b-1
                border-indigo-50/50
            "
        >
            <NavigationButton onClick={() => router.back()}>&larr;</NavigationButton>
            <NavigationButton onClick={() => router.forward()}>&rarr;</NavigationButton>
        </Row>
    );
}