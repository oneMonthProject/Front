'use client';

import React from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useMilestones} from "@/hooks/useMilestones";
import {TaskSectionSkeleton} from "@/components/ui/skeleton/project/task";

function TaskSection({projectId}: { projectId: string }) {
    const {
        activeMilestone: initActiveMilestone,
        activeMilestoneId: initActiveMilestoneId,
        isMilestoneLoading,
        milestoneList
    } = useMilestones(projectId);

    if (isMilestoneLoading) return <TaskSectionSkeleton/>;

    return milestoneList.length > 0
        ? (
            <section className='w-full mt-12 flex flex-col items-start'>
                <TaskSectionHeader initActiveMilestone={initActiveMilestone}/>
                <Tasks initActivemilestoneId={initActiveMilestoneId!} projectId={projectId}/>
            </section>
        ) : null;
}

export default TaskSection;