'use client';

import React, {Suspense, useEffect, useState} from 'react';
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";
import {ProjectInfoSkeleton, ProjectNavTabSkeleton} from "@/components/ui/skeleton/project/task";
import useClientMount from "@/hooks/useClientMount";

function ProjectPage() {
    const mounted = useClientMount();

    return (
        <>
            {
                mounted &&
                <Suspense fallback={<ProjectInfoSkeleton/>}>
                    <ProjectInfo/>
                </Suspense>
            }
            <Suspense fallback={<ProjectNavTabSkeleton/>}>
                <ProjectNavTab/>
            </Suspense>
        </>
    );
}

export default ProjectPage;