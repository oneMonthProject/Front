import React, {ReactNode} from 'react';
import getQueryClient from "@/app/getQueryClient";
import {HydrationBoundary} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {getPositionList, getTechList} from "@/service/setting";

async function HydratedData({children}: { children: ReactNode }) {
    const queryClient = getQueryClient();

    const positionQuery = queryClient.prefetchQuery({queryKey: ['positions'], queryFn: getPositionList});
    const techQuery = queryClient.prefetchQuery({queryKey: ['techs'], queryFn: getTechList});

    await Promise.all([positionQuery, techQuery]);
    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    );
}

export default HydratedData;