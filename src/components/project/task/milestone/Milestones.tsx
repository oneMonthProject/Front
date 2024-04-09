'use client';

import React from 'react';
import MilestoneCard from "@/components/project/task/milestone/MilestoneCard";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {MilestoneInfo} from "@/utils/type";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";


function Milestones({milestoneList}: { milestoneList: MilestoneInfo[] }) {
    const {activeMilestone} = useRecoilValue(milestoneActiveStateStore);

    const activeMilestoneId = activeMilestone
        ? activeMilestone.mileStoneId
        : (milestoneList.find(v => v.progressStatus === '진행중') || milestoneList[0]).mileStoneId;

    const activeMilestoneIndex = milestoneList.find(v => v.mileStoneId === activeMilestoneId)!.index;


    if (milestoneList.length < 1)
        return (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        );

    return (
        <CustomSwiper
            slideItems={
                milestoneList.map((v) => (
                    {
                        key: v.mileStoneId.toString(),
                        components:
                            <MilestoneCard
                                milestoneInfo={v}
                                activeMilestoneId={activeMilestoneId}
                            />
                    }
                ))}
            activeSlideIndex={activeMilestoneIndex!}
        />
    )

}

export default Milestones;