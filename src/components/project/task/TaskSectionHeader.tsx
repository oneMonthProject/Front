'use client';
import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {currentTaskFormState, TaskForm} from "@/store/project/task/TaskStateStore";
import {milestoneActiveStateStore, MilestoneStatusName} from "@/store/project/task/MilestoneStateStore";
import MilestoneStatusBadge from "@/components/ui/badge/MilestoneStatusBadge";

interface TaskSectionHeaderProps {
    content:string;
    startDate:string;
    endDate:string;
    progressStatus: MilestoneStatusName;
}
export default function TaskSectionHeader({content, startDate, endDate, progressStatus}:TaskSectionHeaderProps) {
    const setTaskFormState = useSetRecoilState(currentTaskFormState);

    return (
        <div className='w-full flex items-center justify-start mb-4'>
            <Button size='md'
                    onClickHandler={() => setTaskFormState(new TaskForm('add', null, '', false, null, null, null, '', null))}>
                    <span className='flex items-center'>
                        <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                        업무 추가
                    </span>
            </Button>
            <div className='ml-4 mr-auto flex items-center space-x-3'>
                <h3 className='my-2 tablet:text-3xl font-medium text-greyDarkBlue'>
                    {content}
                </h3>
                <MilestoneStatusBadge text={progressStatus}/>
                <div className='flex items-center space-x-3 tablet:text-xl text-grey800'>
                    <span>{startDate} &#126;</span>
                    <span>{endDate}</span>
                </div>
            </div>
        </div>
    );
}