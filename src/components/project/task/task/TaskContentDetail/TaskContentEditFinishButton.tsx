'use client';

import React from 'react';
import {MdModeEdit} from "@react-icons/all-files/md/MdModeEdit";
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {useMediaQuery} from "react-responsive";

interface Props {
    onClickHandler: () => void;
    mode: 'edit' | 'finish'
}

function TaskContentEditFinishButton({onClickHandler, mode}: Props) {
    const isMobile = useMediaQuery({maxWidth: 700});
    const iconSize = isMobile ? 18 : 23;
    return (
        <button type='button' onClick={onClickHandler}>
            {
                mode === 'edit'
                    ? <MdModeEdit size={iconSize}/>
                    : <FaCheck size={iconSize} className='text-primary'/>
            }
        </button>
    );
}

export default TaskContentEditFinishButton;