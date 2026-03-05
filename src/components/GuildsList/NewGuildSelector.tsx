"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import Col from "../Col";
import CreateGuildForm from "../Forms/Guilds/GuildCreation/CreateGuildForm";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function NewGuildSelector() {
    const [mounted, setMounted] = useState(false);
    const [showOverlay, setShowOverlay] = useState<boolean>(true);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    const Overlay = () => <CreateGuildForm />;

    return (
        <Col
            id="new-guild-selector"
            title="Create A New Guild"
            className="
                w-10
                h-10

                bg-slate-950

                border-2
                border-fuchsia-900

                hover:cursor-pointer
                hover:bg-slate-900

                rounded-full
            "
            onClick={() => setShowOverlay(!showOverlay)}
        >
            <PlusIcon className="w-full h-full text-fuchsia-900" />

            {
                mounted && showOverlay && createPortal(<Overlay />, document.body)
            }
        </Col>
    );
}