'use client';

import React, {Suspense, useEffect, useState} from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateSelector} from "@/store/project/task/MilestoneStateStore";
import {TaskSectionSkeleton} from "@/components/ui/skeleton/project/task";

function TaskSection() {
    const [mounted, setMounted] = useState(false);
    const activeMilestone = useRecoilValue(milestoneActiveStateSelector);

    useEffect(() => {
        setMounted(true);
    }, []);

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