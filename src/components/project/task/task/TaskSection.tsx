'use client';
import React from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";

function TaskSection() {
    const activeMilestone = useRecoilValue(milestoneActiveStateStore);

    return (
        <section className='w-full flex flex-col items-start'>
            {activeMilestone &&
                <TaskSectionHeader
                    content={activeMilestone.content}
                    startDate={activeMilestone.startDate}
                    endDate={activeMilestone.endDate}
                    progressStatus={activeMilestone.progressStatus}/>
            }
            {
                activeMilestone && <Tasks milestoneId={activeMilestone.activeId as bigint}/>
            }
        </section>
    )
        ;
}

export default TaskSection;