'use client';

import React, {Suspense, useEffect, useState} from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateSelector} from "@/store/project/task/MilestoneStateStore";
import {TaskSectionSkeleton} from "@/components/ui/skeleton/project/task";
import useClientMount from "@/hooks/useClientMount";

function TaskSection() {
    const mounted = useClientMount();
    const activeMilestone = useRecoilValue(milestoneActiveStateSelector);

    return (
        <section className='w-full flex flex-col items-start'>
            {(activeMilestone && mounted) &&
                <Suspense fallback={<TaskSectionSkeleton/>}>
                    <TaskSectionHeader/>
                    <Tasks milestoneId={activeMilestone.mileStoneId}/>
                </Suspense>
            }
        </section>
    );
}

export default TaskSection;