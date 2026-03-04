"use client";

import { Guild } from "@/_Interfaces/Guilds/Guild";
import Image from "next/image";
import Link from "next/link";

export default function GuildSelector({ guildName, guildID, guildIconName }: { guildName: Guild["name"], guildID: Guild["gid"], guildIconName: Guild["iconFileName"] }) {
    const icon = `http://localhost:3000/media/guild_icons/${guildIconName}`;
    
    console.log("Icon:", icon);

    return (
        <Link href={`/guilds/${guildID}`} title={guildName}>
            <Image
                alt={`Icon for guild ${guildName} (${guildID})`}
                src={icon}
                width={512}
                height={512}
                className="
                    w-10
                    h-10
                    rounded-full
                "
            />
        </Link>
    );
}