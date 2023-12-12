import React, {ReactNode} from 'react';
import {dehydrate} from "@tanstack/query-core";
import {HydrationBoundary} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project";
import {useQueryString} from "@/hooks/useQueryString";
import getQueryClient from "@/app/getQueryClient";
import {CookieValueTypes} from "cookies-next";

interface HydratedProjectInfoProps {
    children: ReactNode,
    accessToken:  CookieValueTypes
}

async function HydratedProjectInfo({accessToken, children}: HydratedProjectInfoProps) {
    const projectId = useQueryString('projectId');
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