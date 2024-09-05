'use client';

import React from 'react';
import {numStrToBigInt} from "@/utils/common";
import {useRecoilValueLoadable} from "recoil";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import ProjectSettingInfo from "@/components/project/setting/info/ProjectSettingInfo";
import ProjectSettingBoardInfo from "@/components/project/setting/board/ProjectSettingBoardInfo";


function SettingPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state: authState, contents: authContents} = useRecoilValueLoadable(projectTaskAuthSelector(null));

    if(authState === 'loading') return <div>loading..</div>;

    return (
        <section className='w-full mx-auto space-y-[100px]'>
            <ProjectSettingInfo projectId={numStrToBigInt(projectId)} authMap={authContents.data}/>
            <ProjectSettingBoardInfo projectId={numStrToBigInt(projectId)} authMap={authContents.data}/>
        </section>
    );
}

export default SettingPage;