import React, {Suspense} from 'react';
import {redirect, usePathname} from "next/navigation";
import {useQueryString} from "@/hooks/useQueryString";
import HydratedProjectInfo from "@/components/project/hydrations/HydratedProjectInfo";
import ProjectInfo from "@/components/project/layout/ProjectInfo";
import ProjectNavTab from "@/components/project/layout/ProjectNavTab";

function ProjectPage(
    {
        searchParams,
    }: {
        searchParams: { [key: string]: string | string[] | undefined }
    }) {

    return (
        <>
            <HydratedProjectInfo projectId={searchParams.projectId as string}>
                <ProjectInfo/>
            </HydratedProjectInfo>
            <Suspense fallback={<div>로딩중</div>}>
                <ProjectNavTab/>
            </Suspense>
        </>
    );
}

export default ProjectPage;