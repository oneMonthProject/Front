import React, {ReactNode} from 'react';
import {dehydrate} from "@tanstack/query-core";
import {HydrationBoundary} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project";
import getQueryClient from "@/app/getQueryClient";
import {cookies} from "next/headers";
import {getCookie} from "cookies-next";

interface HydratedProjectInfoProps {
    projectId: string;
    children: ReactNode,

}

async function HydratedProjectInfo({projectId, children}: HydratedProjectInfoProps) {
    const accessToken = getCookie('accessToken', {cookies});
    const queryClient = getQueryClient();

    if (projectId) {
        await queryClient.prefetchQuery({
            queryKey: ['projectInfo'], queryFn: () => getMyProjectDetail({accessToken, projectId})
        });
    }

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    );

}

export default HydratedProjectInfo;