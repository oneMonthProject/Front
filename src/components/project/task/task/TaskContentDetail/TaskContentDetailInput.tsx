'use client';

import React, {ChangeEvent, useRef, useState} from 'react';
import {MdModeEdit} from "@react-icons/all-files/md/MdModeEdit";
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line";
import {FaCheck} from "@react-icons/all-files/fa/FaCheck";
import {ImCancelCircle} from "@react-icons/all-files/im/ImCancelCircle";
import {TaskContentDetailItem} from "@/utils/type";
import {useSetRecoilState} from "recoil";
import {TaskContentDetailFormState, taskContentDetailSelector} from "@/store/project/task/TaskStateStore";


function TaskContentDetailInput({initContents}: { initContents: TaskContentDetailItem }) {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [value, setValue] = useState(() => initContents.data);
    const [placeholder, setPlaceholder] = useState('할 일 입력');
    const setTaskContentDetail = useSetRecoilState(taskContentDetailSelector);

    const inputRef = useRef<HTMLInputElement | null>(null);

    /**
     * 수정 모드 click
     */
    function onClickEditModeButtonHandler() {
        setIsReadOnly(false);
        inputRef.current?.focus();
    }

    /**
     * 수정 완료 click
     */
    function onClickEditFinishHandler() {
        setTaskContentDetail((prev: TaskContentDetailFormState) => {
            const updatedContentDetail = [];
            for (const content of prev.contentDetail) {
                updatedContentDetail.push(
                    content.id === initContents.id ?
                        {...content, data: value} : {...content}
                );
            }
            return {...prev, contentDetail: updatedContentDetail};
        });

        setIsReadOnly(true);
    }

    /**
     * 삭제 버튼 click
     */
    function onClickDeleteButtonHandler() {
        setTaskContentDetail((prev: TaskContentDetailFormState) => {
            const updatedContentDetail = prev.contentDetail.filter((content) => content.id !== initContents.id);
            return {...prev, contentDetail: updatedContentDetail};
        });

        setIsReadOnly(true);
    }

    /**
     * 수정 취소 버튼 click
     */
    function onClickEditCancelButtonHandler(){
        setValue(initContents.data);
        setIsReadOnly(true);
    }

    console.log("value: ", value.length);

    return (
        <div
            className={`w-full my-1 flex items-center relative`}
        >

            <div
                className='w-full flex items-center p-1 '>
                <div className={`relative ml-1 min-h-[2.3rem] ${value === "" && 'min-w-[6.8rem]'}`}>
                    <div className='relative flex items-center space-x-1 z-10'>
                        <div className='w-[320px] whitespace-nowrap text-transparent'>{value}</div>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={placeholder}
                        className={`w-[320px] absolute top-0 left-0 z-10 appearance-none border-none focus:border-transparent 
                            focus:ring-0 focus:outline-none ${!isReadOnly && 'hoverColorChange-ground200'}`}
                        onChange={(e) => {
                            if (e.target.value === "") setPlaceholder('할 일 입력');
                            setValue(e.target.value);
                        }}
                        value={value}
                        maxLength={30}
                        readOnly={isReadOnly}
                    />

                </div>
            </div>
            <div
                className={`w-full flex space-x-3 mx-1 text-3xl text-neutral-dark z-10`}>
                <button type='button' onClick={isReadOnly ? onClickEditModeButtonHandler : onClickEditFinishHandler}>
                    {isReadOnly ? <MdModeEdit size={23}/> : <FaCheck size={23} className='text-primary'/>}
                </button>
                <button type='button' onClick={isReadOnly ? onClickDeleteButtonHandler : onClickEditCancelButtonHandler}>
                    {isReadOnly ? <RiDeleteBin6Line size={23}/> : <ImCancelCircle size={23} className='text-gray-500'/>}
                </button>
            </div>
        </div>
    );
}

export default TaskContentDetailInput;