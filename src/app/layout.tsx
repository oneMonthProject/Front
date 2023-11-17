import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/Providers";
import React from "react";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "trustcrews",
  description:
    "개발자들간의 책임감 있는 협업을 도와주는 팀프로젝트 매칭 서비스",
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
            <Header />
            {children}
          </div>
          <div id="modal" className="absolute top-0 w-full"></div>
        </Providers>
      </body>
    </html>
  );
}
