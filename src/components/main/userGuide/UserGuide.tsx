"use client";

import React from "react";
import Link from "next/link";
import UserGuideNavLink from "@/components/main/userGuide/UserGuideNavLink";

const UserGuide = () => {
    return (
        <section
            className="w-full pc:h-[310px] mobile:h-[200px] flex flex-col justify-center items-start px-[120px] py-[25px] my-5 mx-4 bg-emerald-500/10 rounded-3xl">
            <div className='flex items-center space-x-2 my-10'>
                <h1 className='text-4xl font-bold text-secondary'>
                    TRUSTCREWS
                </h1>
                <p className='text-2xl font-semibold'>: 성실한 팀원들과의 사이드 프로젝트</p>
            </div>
            <h2
                className='inline-block py-[2px] px-6 text-lg font-semibold text-white bg-teal-400/70 self-start rounded-full'>
                이용 안내
            </h2>
            <nav className=''>
                <ul className='flex mobile:flex-col flex-wrap h-[50px] items-center mobile:justify-center py-4'>
                    <UserGuideNavLink href='https://quirky-log-8a0.notion.site/103ddc74b8648090aee4e3a385cea5c2?pvs=4'>
                        👉 프로젝트 시작하기
                    </UserGuideNavLink>
                    <UserGuideNavLink href='https://quirky-log-8a0.notion.site/17b9f99de14d4bc2b54ed8057ae95faf?pvs=4'>
                        👉 프로젝트 참여하기
                    </UserGuideNavLink>
                    <UserGuideNavLink href='https://quirky-log-8a0.notion.site/104ddc74b86480b6ae0ee50670d21691?pvs=4'>
                        👉 신뢰 레벨 시스템
                    </UserGuideNavLink>
                </ul>
            </nav>
        </section>
    );
};

export default UserGuide;
