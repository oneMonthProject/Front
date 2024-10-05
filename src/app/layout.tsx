import type {Metadata} from "next";
import "./globals.css";
import Providers from "@/app/Providers";
import React from "react";
import Header from "@/components/header/Header";
import Snackbar from "@/components/ui/Snackbar";
import StaticDataProvider from "@/app/StaticDataProvider";

export const metadata: Metadata = {
    title: "trustcrews",
    description:
        "성실한 개발자들과의 사이드 프로젝트",
};


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
        <body className="w-full">
        <Providers>
            <div className="responsiveContainer">
                <StaticDataProvider>
                    <Header/>
                    {children}
                </StaticDataProvider>
            </div>
            <div id="modal" className="absolute top-0 w-full"></div>
            <Snackbar/>
        </Providers>
        </body>
        </html>
    );
}
