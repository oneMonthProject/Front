'use client';

import React, {Dispatch, SetStateAction, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {TaskContentDetailsState, taskContentDetailSelector} from "@/store/project/task/TaskStateStore";
import _ from "lodash";
import {snackbarState} from "@/store/CommonStateStore";
import TaskContentAddButton from "@/components/project/task/task/TaskContentDetail/TaskContentAddButton";
import {TaskContentDetail} from "@/app/project/@task/_utils/type";

function TaskContentDetailAddInput({setIsOpen}: { setIsOpen: Dispatch<SetStateAction<boolean>>; }) {
    const setSnackbar = useSetRecoilState(snackbarState);
    const [value, setValue] = useState('');
    const [placeholder, setPlaceholder] = useState('할 일 입력');
    const [taskContentDetail, setTaskContentDetail] = useRecoilState(taskContentDetailSelector);


    function onClickAddButtonHandler(){
        if(taskContentDetail.contents.length === 5){
            setSnackbar({show:true, type:'INFO', content:'할 일은 업무당 최대 5개 추가할 수 있습니다.'});
            return;
        }

        const id = _.random().toString();
        setTaskContentDetail((prev:TaskContentDetailsState) => {
            const updatedContentDetail:TaskContentDetail[] = [...prev.contents, {id, data:value}];
            return {...prev.contents, contents:updatedContentDetail};
        });
        setValue("");
    }


    return (
        <div className='my-2 flex items-center'>
            <div
                className='w-full flex items-center p-1'>
                <div className={`relative ml-1 min-h-[2.3rem] mobile:min-h-[2rem] ${value.length === 0 && 'min-w-[6.8rem]'}`}>
                    <div className='relative flex items-center space-x-1 z-10'>
                        <div className='w-[320px] mobile:w-[240px] whitespace-nowrap text-transparent'>{value}</div>
                    </div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        className='h-full w-[320px] mobile:w-full absolute top-0 left-0 z-10 text-greyBlue hoverColorChange-ground200
                         appearance-none border-none focus:outline-none focus:border-none focus:ring-0'
                        onChange={(e) => {
                            if (e.target.value === "") setPlaceholder('할 일 입력');
                            setValue(e.target.value);
                        }}
                        spellCheck={false}
                        value={value}
                        maxLength={30}
                        readOnly={false}
                    />

                </div>
            </div>
            <div className={`w-full opacity-100 flex space-x-1 mx-1`}>
               <TaskContentAddButton onClickAddButtonHandler={onClickAddButtonHandler}/>
            </div>
        </div>
    );
}

export default TaskContentDetailAddInput;