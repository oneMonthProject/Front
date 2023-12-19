'use client';
import React from 'react';
import {useQueryString} from "@/hooks/useQueryString";
import MilestoneCard from "@/components/project/task/milestone/MilestoneCard";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {useQuery} from "@tanstack/react-query";
import {getProjectMilestones as getProjectMilestonesAPI} from "@/service/project";
import {convertStringToDate, sortByStartDate} from "@/utils/common";


function Milestones() {
    const projectId = useQueryString('projectId');

    async function getProjectMilestones() {
        return await getProjectMilestonesAPI(projectId);
    }

    const {data, isLoading, error} = useQuery<ResponseBody<MilestoneInfo[]>, Error>({
        queryKey: ['milestoneList'],
        queryFn: getProjectMilestones
    });

    if (isLoading) return <div>loading...</div>;

    const sortedMilestoneInfo = sortByStartDate(data!.data, 'asc');

    const milestoneInfo = sortedMilestoneInfo.map(v => {
        return {
            ...v,
            createDate: convertStringToDate(v.createDate, 'yyyy-MM-dd'),
            startDate: convertStringToDate(v.startDate, 'yyyy-MM-dd'),
            endDate: convertStringToDate(v.endDate, 'yyyy-MM-dd'),
            updateDate: convertStringToDate(v.updateDate, 'yyyy-MM-dd')
        }
    });



    return milestoneInfo.length > 0
        ? (
            <CustomSwiper
                slideItems={milestoneInfo.map(v => (
                    {
                        key: v.mileStoneId.toString(),
                        components: <MilestoneCard milestoneInfo={v}/>
                    }
                ))}
            />
        )
        : (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        );
}

export default Milestones;