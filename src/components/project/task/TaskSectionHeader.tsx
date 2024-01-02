'use client';
import React from 'react';
import TaskAddButton from "@/components/project/task/task/TaskAddButton";
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";
import {TaskStatusName} from "@/utils/type";

interface TaskSectionHeaderProps {
    content:string;
    startDate:string;
    endDate:string;
    progressStatus: TaskStatusName;
}
export default function TaskSectionHeader({ content, startDate, endDate, progressStatus}:TaskSectionHeaderProps) {

    return (
        <div className='w-full flex items-center justify-start mb-4'>
           <TaskAddButton/>
            <div className='ml-4 mr-auto flex items-center space-x-3'>
                <h3 className='my-2 tablet:text-3xl font-medium text-greyDarkBlue'>
                    {content}
                </h3>
                <TaskStatusBadge text={progressStatus}/>
                <div className='flex items-center space-x-3 tablet:text-xl text-grey800'>
                    <span>{startDate} &#126;</span>
                    <span>{endDate}</span>
                </div>
            </div>
        </div>
    );
}