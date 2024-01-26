'use client';

import React, {useEffect, useState} from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";

function TaskSection() {
    const [mounted, setMounted] = useState(false);
    const activeMilestone = useRecoilValue(milestoneActiveStateStore);

    useEffect(()=>{
        setMounted(true);
    },[])

    return (
        <section className='w-full flex flex-col items-start'>
            {(activeMilestone && mounted) &&
                <TaskSectionHeader
                    content={activeMilestone.content}
                    startDate={activeMilestone.startDate}
                    endDate={activeMilestone.endDate}
                    progressStatus={activeMilestone.progressStatus}/>
            }
            {
                (activeMilestone && mounted) && <Tasks milestoneId={activeMilestone.activeId as bigint}/>
            }
        </section>
    )
        ;
}

export default TaskSection;