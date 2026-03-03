"use server";

import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Col from "@/components/Col";
import { UserCookie } from "@/_Actions/SigninAction";
import { FetchServerCookie } from "@/_Helpers/FetchServerCookie";
import Sidebar from "@/components/Sidebar/Sidebar";
import Row from "@/components/Row";
import NavigationBar from "@/components/Navigation/NavigationBar";

export default async function RootLayout({ children }: { children: ReactNode }) {
    const userData: UserCookie | null = await FetchServerCookie("user");

    return (
        <html lang="en" className="h-full bg-neutral-950 text-slate-50">
            <head>
                <meta charSet="UTF-8" />
                <link rel="shortcut icon" href="/assets/steamership.png" type="image/x-icon"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>River Bend Digital Library</title>
            </head>
            <body className="
                flex
                flex-col
                w-full
            ">

                <Navbar />

                <Col
                    classes="
                        flex-1
                        w-full
                        min-h-0
                                
                        bg-gradient-to-r
                        from-slate-950
                        via-slate-800
                        to-slate-950
        
                        gap-2
                    "
                >
                    <Row
                        classes="
                            w-full
                            min-h-screen
                            items-stretch

                            bg-slate-950

                            border-1
                            border-teal-50/50
                        "
                    >
                            
                        <Sidebar userData={userData} />

                        <Col classes="w-4/5">
                            <NavigationBar />

                            <Col
                                id="page-wrapper"
                                classes="
                                    w-full
                                    p-2
                                "
                            >
                                {children}
                            </Col>
                        </Col>
            
                        
            
                    </Row>
                </Col>

            </body>
        </html>
    );
}