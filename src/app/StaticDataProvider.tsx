import React from 'react';
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {
    getPositionList as getPositionListAPI,
    getTechStackCategoryList,
    getTechStackListWithCategory,
    getTechStackList as getTechStackListAPI
} from "@/service/setting";

async function StaticDataProvider({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    const positions = queryClient.prefetchQuery({
        queryKey: ['positions'],
        queryFn: getPositionListAPI
    });

    console.log("prefetch positions: ", positions);

    const techs = queryClient.prefetchQuery({
        queryKey: ['techStackCategoryList'],
        queryFn: getTechStackCategoryList
    });

    console.log("prefetch techStackCategoryList: ", techs);

    const techResponse = queryClient.prefetchQuery({
        queryKey: ['techStackListWithCategory'],
        queryFn: getTechStackListWithCategory
    })

    console.log("prefetch techStackListWithCategory: ", techResponse);

    const techStacks = queryClient.prefetchQuery({
        queryKey:['techStacks'],
        queryFn: getTechStackListAPI
    })

    console.log("prefetch techStacks: ", techStacks);

    await Promise.all([positions, techs, techResponse, techStacks]);

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    );
}

export default StaticDataProvider;