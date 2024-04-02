'use client';

import {useSuspenseQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getProjectMilestones} from "@/service/project/milestone";
import React, {useEffect} from "react";
import {convertStringToDate, sortByStartDate} from "@/utils/common";
import {useSetRecoilState} from "recoil";
import {milestoneListStateStore} from "@/store/project/task/MilestoneStateStore";


export const useMilestoneList = (projectId: string) => {
    const setMilestoneListState = useSetRecoilState(milestoneListStateStore);

    const {data} = useSuspenseQuery<ResponseBody<MilestoneInfo[]>, Error>({
        queryKey: ['milestoneList'],
        queryFn: () => getProjectMilestones(projectId)
    });

    const sortedList = sortByStartDate(data.data, 'asc').map(v => {
        return {
            ...v,
            createDate: convertStringToDate(v.createDate, 'yyyy-MM-dd'),
            startDate: convertStringToDate(v.startDate, 'yyyy-MM-dd'),
            endDate: convertStringToDate(v.endDate, 'yyyy-MM-dd'),
            updateDate: convertStringToDate(v.updateDate, 'yyyy-MM-dd')
        }
    });

    useEffect(() => {
        setMilestoneListState({
            activeId: null
            , activeSlideIndex: 0
            , list: sortedList
        });

    }, [sortedList, setMilestoneListState]);

    return {list: sortedList};
}


