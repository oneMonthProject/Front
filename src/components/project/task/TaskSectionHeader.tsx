'use client';
import React from 'react';
import TaskAddButton from "@/components/project/task/task/TaskAddButton";
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";
import {TaskStatusName} from "@/utils/type";
import {milestoneActiveStateSelector, MilestoneStatusName} from "@/store/project/task/MilestoneStateStore";
import {useRecoilValue} from "recoil";


export default function TaskSectionHeader() {
    const activeMilestone = useRecoilValue(milestoneActiveStateSelector);
    if(activeMilestone == null) return null;

    const {content, progressStatus, startDate, endDate} = activeMilestone;

    return (
        <div className='w-full flex mobile:flex-col mobile:items-start items-center justify-start mobile:space-y-4 tablet:mb-4'>
           <TaskAddButton/>
            <div className='flex-wrap flex items-center tablet:ml-4 mr-auto space-x-3'>
                <h3 className='max-w-[300px] mobile:w-[150px] my-2 tablet:text-3xl font-medium text-greyDarkBlue truncate'>
                    {content}
                </h3>
                <TaskStatusBadge text={progressStatus} size='sm'/>
                <div className='flex-wrap flex items-center space-x-2 tablet:text-xl text-grey800'>
                    <span>{startDate}</span>
                    <span>&#126;</span>
                    <span>{endDate}</span>
                </div>
            </div>
        </div>
    );
}