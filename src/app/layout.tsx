import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Providers from "@/app/Providers";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'trustcrews',
    description: '개발자들간의 책임감 있는 협업을 도와주는 팀프로젝트 매칭 서비스',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className='w-full'>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
