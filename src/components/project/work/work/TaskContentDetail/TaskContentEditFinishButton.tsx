'use client';

import React from 'react';
import {MdModeEdit} from "@react-icons/all-files/md/MdModeEdit";
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {useMediaQuery} from "react-responsive";
import {useRecoilValue} from "recoil";
import {taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

interface Props {
    onClickHandler: () => void;
    mode: 'edit' | 'finish'
}

function TaskContentEditFinishButton({onClickHandler, mode}: Props) {
    const isMobile = useMediaQuery({maxWidth: 700});
    const iconSize = isMobile ? 18 : 23;
    const {progressStatusCode} = useRecoilValue(taskProgressModFieldSelector);

    return (
        <button
            type='button'
            onClick={() => onClickHandler()}
            disabled={progressStatusCode === TASK_STATUS.PS003.value}
            className='disabled:text-gray-600/70'
        >
            {
                mode === 'edit'
                    ? <MdModeEdit size={iconSize}/>
                    : <FaCheck size={iconSize} className='text-primary'/>
            }
        </button>
    );
}

export default TaskContentEditFinishButton;