'use client';

import React from 'react';
import {numStrToBigInt} from "@/utils/common";
import {useRecoilValueLoadable} from "recoil";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import ProjectSettingInfo from "@/components/project/setting/info/ProjectSettingInfo";
import ProjectSettingBoardInfo from "@/components/project/setting/board/ProjectSettingBoardInfo";
import ProjectSettingCrewAuth from "@/components/project/setting/crewAuth/ProjectSettingCrewAuth";
import ProjectSettingEndProject from "@/components/project/setting/endProject/ProjectSettingEndProject";
import ProjectSettingEndProjectSkeleton from "@/components/project/setting/endProject/ProjectSettingEndProjectSkeleton";
import ProjectSettingInfoSkeleton from "@/components/project/setting/info/ProjectSettingInfoSkeleton";
import ProjectSettingBoardInfoSkeleton from "@/components/project/setting/board/ProjectSettingBoardInfoSkeleton";
import ProjectSettingCrewAuthSkeleton from "@/components/project/setting/crewAuth/ProjectSettingCrewAuthSkeleton";
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import {HttpStatus} from "@/app/api/_interceptor/utils/httpStatus";
import Navigator from "@/components/ui/error/Navigator";
import StyledLink from "@/components/ui/StyledLink";
import ErrorPageContainer from "@/components/ui/error/ErrorPageContainer";


function SettingPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state: authState, contents: authContents} = useRecoilValueLoadable(projectTaskAuthSelector(null));

    if (authState === 'loading') return (
        <section className='w-full mx-auto space-y-[100px]'>
            <ProjectSettingInfoSkeleton/>
            <ProjectSettingBoardInfoSkeleton/>
            <ProjectSettingCrewAuthSkeleton/>
            <ProjectSettingEndProjectSkeleton/>
        </section>
    );

    if (!authContents.data.configAuth) return (
        <ErrorPageContainer className='justify-center bg-ground200 rounded-md'>
            <ErrorMessage className='leading-loose mobile:text-base mobile:px-5'>
                접근 권한이 없습니다. 프로젝트 관리자에게 문의하세요
            </ErrorMessage>
        </ErrorPageContainer>
    );

    return (
        <section className='w-full mx-auto space-y-[100px]'>
            <ProjectSettingInfo projectId={numStrToBigInt(projectId)} authMap={authContents.data}/>
            <ProjectSettingBoardInfo projectId={numStrToBigInt(projectId)} authMap={authContents.data}/>
            <ProjectSettingCrewAuth projectId={projectId}/>
            <ProjectSettingEndProject projectId={numStrToBigInt(projectId)}/>
        </section>
    );
}

export default SettingPage;