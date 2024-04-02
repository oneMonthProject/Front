'use client';

import React from 'react';
import {useQueryString} from "@/hooks/useQueryString";
import MilestoneCard from "@/components/project/task/milestone/MilestoneCard";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {useMilestoneList} from "@/hooks/useMilestoneList";


function Milestones() {
    const projectId = useQueryString("projectId");
    const {list} = useMilestoneList(projectId);

    if (list.length < 1)
        return (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        );

    return (
        <CustomSwiper
            slideItems={
                list.map((v, index) => (
                    {
                        key: v.mileStoneId.toString(),
                        components:
                            <MilestoneCard
                                milestoneInfo={v}
                                slideIndex={index}
                            />
                    }
                ))}
        />
    )

}

export default Milestones;