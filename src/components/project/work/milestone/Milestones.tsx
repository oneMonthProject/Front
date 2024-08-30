'use client';

import React from 'react';
import MilestoneCard from "@/components/project/work/milestone/MilestoneCard";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {useMilestones} from "@/hooks/useMilestones";
import {MilestoneListSkeleton} from "@/components/ui/skeleton/project/task";
import {useRecoilValueLoadable} from "recoil";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";


function Milestones({projectId}: { projectId: string }) {
    const {
        state: authState,
        contents
    } = useRecoilValueLoadable<ResponseBody<ProjectAuthMap | null>>(projectTaskAuthSelector(null));
    const {
        milestoneList,
        activeMilestoneIndex: initActiveMilestoneIndex,
        activeMilestoneId: initActiveMilestoneId,
        isMilestoneFetching,
    } = useMilestones(projectId);


    if (isMilestoneFetching || authState === 'loading') return <MilestoneListSkeleton/>;

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
                                    authMap={contents.data}
                                />
                        }
                    ))}
                initActiveSlideIndex={initActiveMilestoneIndex!}
            />
        )

}

export default Milestones;