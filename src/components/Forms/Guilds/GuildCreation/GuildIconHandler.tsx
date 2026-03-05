"use client";

import Col from "@/components/Col";
import Row from "@/components/Row";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

export default function GuildIconHandler({ setError }: { setError: Dispatch<SetStateAction<string | null>> }) {
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const iconInputRef = useRef<HTMLInputElement>(null);

    const handleIconSelectClick = () => iconInputRef.current?.click();

    const handleIconImageParse = async (e: ChangeEvent<HTMLInputElement>) => {
        const icon = e.target.files?.[0];

        if (!icon) return;

        // Check image dimensions
        let width = 0;
        let height = 0;
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const image = new window.Image();

            image.src = e.target?.result as string;

            image.onload = () => {
                width = image.naturalWidth;
                height = image.naturalHeight;
            };
        };

        if (width > 512 || height > 512) setError("Guild icon image cannot exceed a width of 512px or a height of 512px. Please resize the image, or try a different one.");

        const objURL = URL.createObjectURL(icon);

        setSelectedIcon(objURL);
    };

    return (
        <>
            <Row
                id="select-icon-button"
                className="
                    items-center
                    p-2
                    border-2
                    border-dashed
                    border-slate-50/30

                    hover:border-fuchsia-800/70

                    cursor-pointer

                    rounded-md
                    
                    gap-2
                "
                onClick={() => handleIconSelectClick()}
            >
                {
                    selectedIcon ?
                    <Image
                        alt="Selected Icon"
                        src={selectedIcon}
                        width={512}
                        height={512}
                        className="w-25 h-25 p-1 bg-slate-950 border-2 border-fuchsia-800 rounded-full"
                    /> :
                    <PhotoIcon className="w-25 h-25 p-1 bg-slate-950 border-2 border-fuchsia-800 rounded-full" />
                }

                <Col>
                    <p className="text-md font-semibold">Select An Image</p>
                    <p className="text-xs font-semibold text-slate-50/40">Image must be no larger than 512 x 512</p>
                </Col>
            </Row>

            <input
                type="file"
                ref={iconInputRef}
                accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
                id="guild-icon"
                name="guild-icon"
                maxLength={32}
                className="hidden"
                onChange={(e) => handleIconImageParse(e)}
            />
        </>
    );
}