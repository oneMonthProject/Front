'use client';

import React from 'react';
import MilestoneCard from "@/components/project/task/milestone/MilestoneCard";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {useMilestones} from "@/hooks/useMilestones";
import {MilestoneListSkeleton} from "@/components/ui/skeleton/project/task";


function Milestones({projectId}: { projectId: string }) {
    const {
        milestoneList,
        activeMilestoneIndex: initActiveMilestoneIndex,
        activeMilestoneId: initActiveMilestoneId,
        isMilestoneFetching,
    } = useMilestones(projectId);


    if (isMilestoneFetching) return <MilestoneListSkeleton/>;

    return milestoneList!.length < 1
        ? (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        )
        : (
            <CustomSwiper
                slideItems={
                    milestoneList.map((v) => (
                        {
                            key: v.mileStoneId.toString(),
                            components:
                                <MilestoneCard
                                    milestoneInfo={v}
                                    initActiveMilestoneId={initActiveMilestoneId}
                                />
                        }
                    ))}
                initActiveSlideIndex={initActiveMilestoneIndex!}
            />
        )

}

export default Milestones;