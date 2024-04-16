'use client';

import React, {useEffect} from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";

function ProjectPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const resetProjectIdState = useResetRecoilState(projectIdState);
    const setProjectIdState = useSetRecoilState(projectIdState);

    // 페이지 이동시 전역의 projectId 초기화
    useEffect(() => {
        setProjectIdState(projectId);
        return () => resetProjectIdState()
    }, [projectId, setProjectIdState, resetProjectIdState]);


    return (
        <>
            <ProjectInfo projectId={projectId}/>
            <ProjectNavTab projectId={projectId}/>
        </>
    );
}

export default ProjectPage;