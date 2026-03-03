"use client";

import { UserCookie } from "@/_Actions/SigninAction";
import { FetchClientCookie } from "@/_Helpers/FetchClientCookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignoutForm from "./SignoutForm";

export default function SignoutFormProvider() {
    const router = useRouter();
    const userData: UserCookie | null = FetchClientCookie("user");

    useEffect(() => {
        if (!userData || !userData.data) router.push("/data/account/signin");
    }, [userData, router]);

    return (
        <>
            <h1 className="text-2xl font-semibold text-center">Are you sure you want to sign out?</h1>

            <SignoutForm />
        </>
    );
}