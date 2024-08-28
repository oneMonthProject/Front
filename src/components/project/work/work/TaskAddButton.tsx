'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {useSetRecoilState} from "recoil";
import {TaskAddForm} from "@/app/project/@task/_utils/type";
import {TASK_STATUS as TS} from "@/app/project/@task/_utils/constant";

type TaskAddButtonProps = {
    milestoneId: string | bigint;
    projectId: string | bigint;
}

function TaskAddButton({milestoneId, projectId}:TaskAddButtonProps) {
    const setTaskFormState = useSetRecoilState(taskModalState);

    function onClickTaskAddButtonHandler() {
        const form: TaskAddForm = {
            title:'업무 추가',
            type:'add',
            workId: 0n,
            projectId: BigInt(projectId),
            milestoneId: BigInt(milestoneId),
            assignedUser: null,
            lastModifiedMemberNickname: '',
            content: '',
            contentDetail: '',
            startDate: '',
            endDate: '',
            progressStatus: TS.DEFAULT.name
        }

        setTaskFormState({isOpen:true, form});
    }

    return (
        <Button size='md'
                onClickHandler={() => onClickTaskAddButtonHandler()}>
                    <span className='flex items-center'>
                        <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                        업무 추가
                    </span>
        </Button>
    );
}

export default TaskAddButton;