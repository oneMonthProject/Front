'use client';

import React from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import useSetProjectIdState from "@/hooks/useSetProjectIdState";

function ProjectPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    useSetProjectIdState(projectId);

    return (
        <>
            <ProjectInfo projectId={projectId}/>
            <ProjectNavTab projectId={projectId}/>
        </>
    );
}

export default ProjectPage;