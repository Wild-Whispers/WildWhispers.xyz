import { UUID } from "crypto";
import { User } from "../Users/User";

export interface Guild {
    gid: UUID,
    name: string,
    createdAt: number,
    iconFileName: string,
    bannerFileName: string,
    bio: string,
    description: string,
    members: Array<User["uid"]>,

}