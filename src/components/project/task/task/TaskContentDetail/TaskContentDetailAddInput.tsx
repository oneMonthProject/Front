'use client';

import React, {Dispatch, SetStateAction, useState} from 'react';
import {useRecoilState} from "recoil";
import {taskContentDetailSelector} from "@/store/project/task/TaskStateStore";
import TaskContentDetailTool from "@/components/project/task/task/TaskContentDetail/TaskContentDetailTool";

function TaskContentDetailAddInput({setIsOpen}: { setIsOpen: Dispatch<SetStateAction<boolean>>; }) {
    const [todoContents, setTodoContents] = useState('');
    // const [taskContentDetail, setTaskContentDetail] = useRecoilState(taskContentDetailSelector);
    const [placeholder, setPlaceholder] = useState('할 일 입력');

    function onBlurHandler() {
        // todo - taskContentDetail 수정

        setIsOpen(false);
        setTodoContents('');
    }


    return (
        <div
            className='relative flex items-center my-2'
            onBlur={onBlurHandler}
        >

            <div
                className='w-full flex items-center text-3xl p-1'>
                <div className={`relative ml-1 min-h-[2.3rem] ${todoContents.length === 0 && 'min-w-[6.8rem]'}`}>
                    <div className='relative flex items-center space-x-1 z-10'>
                        <div className='w-[320px] whitespace-nowrap text-transparent'>{todoContents}</div>
                    </div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        className='w-[320px] absolute top-0 left-0 z-0 hoverColorChange-ground200 appearance-none border-none focus:outline-none focus:border-none focus:ring-0'
                        onChange={(e) => {
                            // if (onChangeHandler !== undefined) onChangeHandler(e.target.value);
                            if (e.target.value === "") setPlaceholder('할 일 입력');
                            else (v: string) => setTodoContents(v);
                        }}
                        spellCheck={false}
                        value={todoContents}
                        readOnly={false}
                        maxLength={30}
                    />

                </div>
            </div>
            <TaskContentDetailTool/>
        </div>
    );
}

export default TaskContentDetailAddInput;