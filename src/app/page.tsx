'use client';

import React from "react";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import ProjectAuthBadge from "@/components/ui/badge/ProjectAuthBadge";


function HomePage() {

    return (
        <>
        <h1>신뢰점수 badge</h1>
            <div className='flex items-center'>
                <TrustGradeBadge size='xs' text='1등급' color='red'/>
                <TrustGradeBadge size='sm' text='1등급' color='red'/>
                <TrustGradeBadge size='md' text='1등급' color='red'/>
                <TrustGradeBadge size='md' text='2등급' color='yellow'/>
                <TrustGradeBadge size='md' text='3등급' color='green'/>
            </div>
            <h1>포지션 badge</h1>
            <div className='flex items-center'>
                <PositionBadge size='xs' text='프론트엔드'/>
                <PositionBadge size='sm' text='프론트엔드'/>
                <PositionBadge size='md' text='프론트엔드'/>
            </div>
            <h1>프로젝트 멤버 권한 badge</h1>
            <div className='flex items-center'>
                <ProjectAuthBadge size='xs' text='매니저'/>
                <ProjectAuthBadge size='sm' text='매니저'/>
                <ProjectAuthBadge size='md' text='매니저'/>
                <ProjectAuthBadge size='md' text='부매니저'/>
            </div>

        </>
    )
}

export default HomePage;