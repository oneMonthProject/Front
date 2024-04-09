'use client';

import {useQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getProjectMilestones} from "@/service/project/milestone";
import React from "react";
import {useQueryString} from "@/hooks/useQueryString";


export const useMilestoneList = () => {
    const projectId = useQueryString('projectId');

    const {data, isFetching} = useQuery<Promise<ResponseBody<MilestoneInfo[]>>, Error, ResponseBody<MilestoneInfo[]>>({
        queryKey: ['milestoneList'],
        queryFn: () => getProjectMilestones(projectId),
    });


    return {list: data!.data, isFetching};
}


