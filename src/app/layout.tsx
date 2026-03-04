"use server";

import { ReactNode } from "react";
import "./globals.css";
import GuildsList from "@/components/GuildsList/GuildsList";

export default async function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full bg-slate-950 text-slate-50">
            <head>
                <meta charSet="UTF-8" />
                <link rel="shortcut icon" href="/assets/icon_v1.png" type="image/x-icon"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Wild Whispers</title>
            </head>
            <body className="
                flex
                flex-col
                w-full
                h-full
                max-w-screen
                max-h-screen
            ">
                <GuildsList />

                {children}
            </body>
        </html>
    );
}