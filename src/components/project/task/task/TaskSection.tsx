'use client';

import React, {Suspense} from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateSelector} from "@/store/project/task/MilestoneStateStore";
import {TaskSectionSkeleton} from "@/components/ui/skeleton/project/task";

function TaskSection() {
    const activeMilestone = useRecoilValue(milestoneActiveStateSelector);

    return (
        <section className='w-full flex flex-col items-start'>
            {
                activeMilestone &&
                <Suspense fallback={<TaskSectionSkeleton/>}>
                    <TaskSectionHeader/>
                    <Tasks milestoneId={activeMilestone.mileStoneId}/>
                </Suspense>
            }
        </section>
    );
}

export default TaskSection;