'use client';

import React from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import useSetProjectIdState from "@/hooks/useSetProjectIdState";
import useSetUserIdState from "@/hooks/useSetUserIdState";

function ProjectPage({searchParams: {projectId, userId}}: { searchParams: { projectId: string, userId: string } }) {
    useSetUserIdState(userId);
    useSetProjectIdState(projectId);

    return  (
        <>
            <ProjectInfo projectId={projectId} userId={userId}/>
            <ProjectNavTab projectId={projectId} userId={userId}/>
        </>
    );
}

export default ProjectPage;