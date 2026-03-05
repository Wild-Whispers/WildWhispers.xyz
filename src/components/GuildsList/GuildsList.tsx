"use client";

import Col from "../Col";
import GuildSelector from "./GuildSelector";
import NewGuildSelector from "./NewGuildSelector";

export default function GuildsList() {
    return (
        <Col
            className="
                h-screen
                max-h-screen
                justify-between
                items-center
                p-2
                
                bg-gradient-to-r
                from-fuchsia-950/20
                via-fuchsia-800/30
                to-fuchsia-950/20

                
                gap-2
            "
        >
            <Col className="items-center gap-2">
                <GuildSelector
                    guildID="23eb85c2-9a79-4aac-8a64-58320eb4b886"
                    guildName="Wild Whispers"
                    guildIconName="wwserver.png"
                />
                <GuildSelector
                    guildID="23eb85c2-9a79-4aac-8a64-58320eb4b886"
                    guildName="Wild Whispers"
                    guildIconName="wwserver.png"
                />
                <GuildSelector
                    guildID="23eb85c2-9a79-4aac-8a64-58320eb4b886"
                    guildName="Wild Whispers"
                    guildIconName="wwserver.png"
                />
                <GuildSelector
                    guildID="23eb85c2-9a79-4aac-8a64-58320eb4b886"
                    guildName="Wild Whispers"
                    guildIconName="wwserver.png"
                />
            </Col>

            <Col className="items-center gap-2">
                <NewGuildSelector />
            </Col>

        </Col>
    );
}