'use client';

import React from 'react';
import {numStrToBigInt} from "@/utils/common";
import {useRecoilValueLoadable} from "recoil";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import ProjectSettingInfo from "@/components/project/setting/info/ProjectSettingInfo";
import ProjectSettingBoardInfo from "@/components/project/setting/board/ProjectSettingBoardInfo";
import ProjectSettingCrew from "@/components/project/setting/crew/ProjectSettingCrew";
import ProjectSettingEndProject from "@/components/project/setting/endProject/ProjectSettingEndProject";
import ProjectSettingEndProjectSkeleton from "@/components/project/setting/endProject/ProjectSettingEndProjectSkeleton";
import ProjectSettingInfoSkeleton from "@/components/project/setting/info/ProjectSettingInfoSkeleton";
import ProjectSettingBoardInfoSkeleton from "@/components/project/setting/board/ProjectSettingBoardInfoSkeleton";
import ProjectSettingCrewSkeleton from "@/components/project/setting/crew/ProjectSettingCrewSkeleton";


function SettingPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state: authState, contents: authContents} = useRecoilValueLoadable(projectTaskAuthSelector(null));

    if (authState === 'loading') return (
        <section className='w-full mx-auto space-y-[100px]'>
            <ProjectSettingInfoSkeleton/>
            <ProjectSettingBoardInfoSkeleton/>
            <ProjectSettingCrewSkeleton/>
            <ProjectSettingEndProjectSkeleton/>
        </section>
    );

    return (
        <section className='w-full mx-auto space-y-[100px]'>
            <ProjectSettingInfo projectId={numStrToBigInt(projectId)} authMap={authContents.data}/>
            <ProjectSettingBoardInfo projectId={numStrToBigInt(projectId)} authMap={authContents.data}/>
            <ProjectSettingCrew/>
            <ProjectSettingEndProject projectId={numStrToBigInt(projectId)}/>
        </section>
    );
}

export default SettingPage;