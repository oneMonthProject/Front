'use client';

import {useQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getProjectMilestones} from "@/service/project/milestone";
import React from "react";


export const useMilestoneList = (projectId: string) => {
    const {data, isFetching} = useQuery<ResponseBody<MilestoneInfo[]>, Error, ResponseBody<MilestoneInfo[]>>({
        queryKey: ['milestoneList', projectId],
        queryFn: () => getProjectMilestones(projectId),
    });

    return {list: data?.data || [], isFetching};
}


