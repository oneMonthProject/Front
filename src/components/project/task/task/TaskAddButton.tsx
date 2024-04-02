'use client';
import React from 'react';
import Button from "@/components/ui/Button";
import {TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {TaskItem} from "@/utils/type";
import {milestoneActiveStateSelector} from "@/store/project/task/MilestoneStateStore";

function TaskAddButton() {
    const setTaskFormState = useSetRecoilState(taskModalFormState);

    const activeMilestone = useRecoilValue(milestoneActiveStateSelector);
    if(activeMilestone == null) return null;

    const {mileStoneId, projectId} = activeMilestone;

    function onClickTaskAddButtonHandler() {
        const newTaskItem: TaskItem = {
            workId: 0n,
            projectId,
            milestoneId: mileStoneId as bigint,
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