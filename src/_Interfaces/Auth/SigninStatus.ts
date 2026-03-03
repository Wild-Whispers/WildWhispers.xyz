import { UserTypes } from "@/_Enums/UserTypes";
import { Admin } from "./Users/Admin";
import { Teacher } from "./Users/Teacher";
import { Student } from "./Users/Student";

export interface SigninStatus {
    uid: Admin["uid"] | Teacher["uid"] | Student["uid"],
    userType: UserTypes,
    last_signin: number,
    password_changed: boolean | undefined
}