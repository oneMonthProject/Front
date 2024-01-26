'use client';

import React from 'react';
import {useQueryString} from "@/hooks/useQueryString";
import MilestoneCard from "@/components/project/task/milestone/MilestoneCard";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getProjectMilestones} from "@/service/project/milestone";
import {convertStringToDate, sortByStartDate} from "@/utils/common";


function Milestones() {
    const projectId = useQueryString('projectId');

    const {data} = useSuspenseQuery<ResponseBody<MilestoneInfo[]>, Error>({
        queryKey: ['milestoneList'],
        queryFn: () => getProjectMilestones(projectId)
    });

    const milestoneList = data!.data;

    if (milestoneList.length < 1)
        return (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        );

    const milestoneInfo = sortByStartDate(milestoneList, 'asc').map(v => {
        return {
            ...v,
            createDate: convertStringToDate(v.createDate, 'yyyy-MM-dd'),
            startDate: convertStringToDate(v.startDate, 'yyyy-MM-dd'),
            endDate: convertStringToDate(v.endDate, 'yyyy-MM-dd'),
            updateDate: convertStringToDate(v.updateDate, 'yyyy-MM-dd')
        }
    });

    // '진행중'인 마일스톤 중 startDate가 가장 빠른 마일스톤 or 진행중인 마일스톤이 없으면 날짜가 가장 빠른 마일스톤
    const activeMilestone = milestoneInfo.find(v => v.progressStatus === '진행중') || milestoneInfo[0];
    return (
        <CustomSwiper
            slideItems={
                milestoneInfo.map((v, index) => (
                    {
                        key: v.mileStoneId.toString(),
                        components:
                            <MilestoneCard
                                milestoneInfo={v}
                                isInitActive={v.mileStoneId === activeMilestone.mileStoneId}
                                slideIndex={index}
                            />
                    }
                ))}
        />
    )

}

export default Milestones;