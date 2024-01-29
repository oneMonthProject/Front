'use client';

import {useSuspenseQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getProjectMilestones} from "@/service/project/milestone";
import React from "react";
import {convertStringToDate, sortByStartDate} from "@/utils/common";

export const useMilestoneListQuery = (projectId: string) =>
    useSuspenseQuery<ResponseBody<MilestoneInfo[]>, Error>({
        queryKey: ['milestoneList'],
        queryFn: () => getProjectMilestones(projectId)
    });

export const useMilestoneList = (projectId:string) => {
    const {data} = useMilestoneListQuery(projectId);

    return sortByStartDate(data.data, 'asc').map(v => {
        return {
            ...v,
            createDate: convertStringToDate(v.createDate, 'yyyy-MM-dd'),
            startDate: convertStringToDate(v.startDate, 'yyyy-MM-dd'),
            endDate: convertStringToDate(v.endDate, 'yyyy-MM-dd'),
            updateDate: convertStringToDate(v.updateDate, 'yyyy-MM-dd')
        }
    });
}

export const useMilestoneInitActive = (projectId:string) => {
    const milestoneList = useMilestoneList(projectId);
    return milestoneList.find(v => v.progressStatus === '진행중') || milestoneList[0];
}

