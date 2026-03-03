"use client";

import { useEffect, useState } from "react";
import { UserTypes } from "@/_Enums/UserTypes";
import FormActionButton from "../Buttons/FormActionButton";
import Col from "../Col";
import Row from "../Row";
import ChangeUsernameForm from "./ChangeUsernameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useRouter } from "next/navigation";
import { UserCookie } from "@/_Actions/SigninAction";
import InformationMessage from "../Messages/InformationMessage";
import { Admin } from "@/_Interfaces/Users/Admin";
import { Teacher } from "@/_Interfaces/Users/Teacher";
import { Student } from "@/_Interfaces/Users/Student";

export default function UserPageForm({ currentUserData, profileUserData }: { currentUserData: UserCookie, profileUserData: UserCookie }) {
    const [currentUser] = useState<Admin | Teacher | Student>(currentUserData.data);
    const [profileUser] = useState<Admin | Teacher | Student>(profileUserData.data);
    const [editingUsername, setEditingUsername] = useState<boolean>(false);
    const [editingPassword, setEditingPassword] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.log("[User Page] Current User:", currentUserData);
            console.log("[User Page] Profile User:", profileUserData);
        }
    }, [currentUserData, profileUserData]);

    useEffect(() => {
        if (editingUsername) setEditingPassword(false);
    }, [editingUsername]);

    useEffect(() => {
        if (editingPassword) setEditingUsername(false);
    }, [editingPassword]);

    const currentUserIsAdmin = currentUserData.type === UserTypes.SUPER_ADMIN || currentUserData.type === UserTypes.ADMIN;
    const currentUserOwnsProfile = currentUser.uid === profileUser.uid;

    return (
        <Col classes="gap-2">
            {
                !currentUserOwnsProfile &&
                <InformationMessage title="Administrator Mode" description={`You are in Administrator Mode. Here, you can perform administrative actions for ${profileUser.first} ${profileUser.last}.`} />
            }

            <Col>
                <h1 className="text-xl font-semibold">{currentUserOwnsProfile ? "Your Profile" : `${profileUser.first} ${profileUser.last}'s Profile`}</h1>
                <p className="">Name: {profileUser.first} {profileUser.last}</p>
                <p className="">Username: {profileUser.username}</p>
                <p className="">Email Address: {profileUser.email}</p>
            </Col>

            {
                currentUserIsAdmin &&
                <Row classes="gap-1">
                    <FormActionButton onClick={() => router.push(`/data/dashboard/teachers/${profileUser.uid}/sections/modify`)}>Modify {(profileUser as Teacher).prefix} {profileUser.last}&apos;s Sections</FormActionButton>
                </Row>
            }

            {
                currentUserOwnsProfile &&
                <Col>
                    <Row classes="gap-1">
                        <FormActionButton onClick={() => editingUsername ? setEditingUsername(false) : setEditingUsername(true)}>{editingUsername ? "Cancel Change Username" : "Change Username"}</FormActionButton>
                        <FormActionButton onClick={() => editingPassword ? setEditingPassword(false) : setEditingPassword(true)}>{editingPassword ? "Cancel Change Password" : "Change Password"}</FormActionButton>
                    </Row>

                    <Col classes="px-4">
                        <ChangeUsernameForm user={currentUser} visible={editingUsername} />

                        <ChangePasswordForm user={currentUser} visible={editingPassword} />
                    </Col>
                </Col>
            }
        </Col>
    );
}