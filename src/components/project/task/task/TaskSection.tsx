'use client';

import React from 'react';
import Tasks from "@/components/project/task/task/Tasks";
import TaskSectionHeader from "@/components/project/task/TaskSectionHeader";
import {useRecoilValue} from "recoil";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";
import {MilestoneInfo} from "@/utils/type";

function TaskSection({milestoneList}:{milestoneList:MilestoneInfo[]}) {
    const {activeMilestone} = useRecoilValue(milestoneActiveStateStore);

    if(milestoneList.length < 1) return null;

    const {mileStoneId, projectId} = activeMilestone
        ? activeMilestone
        : milestoneList.find(v => v.progressStatus === '진행중') || milestoneList[0];

    return (
        <section className='w-full flex flex-col items-start'>
            <TaskSectionHeader activeMilestone={activeMilestone}/>
            <Tasks milestoneId={mileStoneId} projectId={projectId}/>
        </section>
    );
}

export default TaskSection;