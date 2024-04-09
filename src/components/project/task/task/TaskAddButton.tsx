'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {useSetRecoilState} from "recoil";
import {TaskItem} from "@/utils/type";

type TaskAddButtonProps = {
    milestoneId: string | bigint;
    projectId: string | bigint;
}

function TaskAddButton({milestoneId, projectId}:TaskAddButtonProps) {
    const setTaskFormState = useSetRecoilState(taskModalFormState);

    function onClickTaskAddButtonHandler() {
        const newTaskItem: TaskItem = {
            workId: 0n,
            projectId,
            milestoneId,
            assignedUser: null,
            lastModifiedMemberNickname: '',
            content: '',
            contentDetail: '',
            startDate: '',
            endDate: '',
            progressStatus: ''
        }
        setTaskFormState(new TaskModalForm('add', newTaskItem));
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