'use client';

import React from 'react';
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line";
import {ImCancelCircle} from "@react-icons/all-files/im/ImCancelCircle";
import {useMediaQuery} from "react-responsive";
import {useRecoilValue} from "recoil";
import {taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

interface Props {
    onClickHandler: () => void;
    mode: 'cancel' | 'delete'
}

function TaskContentCancelDeleteButton({onClickHandler, mode}: Props) {
    const {progressStatusCode} = useRecoilValue(taskProgressModFieldSelector);
    const isMobile = useMediaQuery({maxWidth: 700});
    const iconSize = isMobile ? 18 : 23;
    return (
        <button
            type='button'
            onClick={onClickHandler}
            disabled={progressStatusCode === TASK_STATUS.PS003.value}
            className='disabled:text-gray-600/70'
        >
            {
                mode === 'delete'
                    ? <RiDeleteBin6Line size={iconSize}/>
                    : <ImCancelCircle size={iconSize} className='text-gray-500'/>
            }
        </button>
    );
}

export default TaskContentCancelDeleteButton;