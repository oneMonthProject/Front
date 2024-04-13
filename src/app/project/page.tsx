'use client';

import React, {Suspense, useEffect} from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import {useResetRecoilState} from "recoil";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";

function ProjectPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const resetProjectIdState = useResetRecoilState(projectIdState);

    // 페이지 이동시 전역의 projectId 초기화
    useEffect(() => {
        return () => resetProjectIdState()
    }, [projectId, resetProjectIdState]);

    return (
        <Suspense>
            <ProjectInfo/>
            <ProjectNavTab/>
        </Suspense>
    );
}

export default ProjectPage;