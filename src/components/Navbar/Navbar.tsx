"use server";

import Image from "next/image";
import Row from "../Row";
import NavbarSection from "./NavbarSection";
import Link from "next/link";
import NavbarButtonSignin from "./NavbarButtonSignin";
import NavbarUserBox from "./NavbarUserBox";
import { UserCookie } from "@/_Actions/SigninAction";
import { FetchServerCookie } from "@/_Helpers/FetchServerCookie";
import NavbarButtonSignout from "./NavbarButtonSignout";
import { UserTypes } from "@/_Enums/UserTypes";
import { ReactNode } from "react";
import { Student } from "@/_Interfaces/Users/Student";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { Admin } from "@/_Interfaces/Users/Admin";

export default async function Navbar() {
    const userData: UserCookie | null = await FetchServerCookie("user");
    const user: Admin | Teacher | Student | null = userData ? userData.data : null;
    const userType: UserTypes | undefined = userData?.type;
    const userBadge: ReactNode = (userType === UserTypes.SUPER_ADMIN || userType === UserTypes.ADMIN) ?
        <Image alt="User Badge" src="/assets/badges/admin-badge.png" width={512} height={512} className="w-8 h-8" /> :
            userType === UserTypes.TEACHER ?
                <Image alt="User Badge" src="/assets/badges/teacher-badge.png" width={512} height={512} className="w-8 h-8" /> :
                    userType === UserTypes.STUDENT ?
                        <Image alt="User Badge" src="/assets/badges/student-badge.png" width={512} height={512} className="w-8 h-8" /> :
                            "Unknown user type";

    return (
        <Row
            classes="
                w-full
                justify-between
                items-center
                p-2
                px-4

                bg-gradient-to-r
                from-slate-950
                via-slate-800
                to-slate-950

                border-b-1
                border-slate-500/50
            "
        >
            <NavbarSection>
                <Link href="/"><Image alt="Navbar Home Image" src="/assets/steamership_white_outline.png" width={2200} height={1263} className="w-20" /></Link>
                <p className="text-lg font-semibold">River Bend Interactive Digital Library</p>
            </NavbarSection>

            <NavbarSection>
                {
                    !user ?
                    <NavbarButtonSignin text="Sign In" href="/data/account/signin" /> :
                    <>
                        {
                            userType === UserTypes.STUDENT ?
                            <NavbarUserBox href={`/data/dashboard/students/${user.uid}`}>
                                <p className="">{user.first} {user.last}</p>
                                {userBadge}
                            </NavbarUserBox>
                            :
                            <NavbarUserBox href={`/data/account/${user.uid}`}>
                                <p className="">My Account</p>
                                {userBadge}
                            </NavbarUserBox>
                        }
                        <NavbarButtonSignout text="Signout" href="/data/account/signout" />
                    </>
                }
            </NavbarSection>
        </Row>
    );
}