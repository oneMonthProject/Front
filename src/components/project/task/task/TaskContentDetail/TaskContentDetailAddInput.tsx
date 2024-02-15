'use client';

import React, {Dispatch, SetStateAction, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {TaskContentDetailFormState, taskContentDetailSelector} from "@/store/project/task/TaskStateStore";
import {IoIosAddCircle} from "@react-icons/all-files/io/IoIosAddCircle";
import _ from "lodash";
import {TaskContentDetailItem} from "@/utils/type";
import {snackbarState} from "@/store/CommonStateStore";

function TaskContentDetailAddInput({setIsOpen}: { setIsOpen: Dispatch<SetStateAction<boolean>>; }) {
    const setSnackbar = useSetRecoilState(snackbarState);
    const [value, setValue] = useState('');
    const [placeholder, setPlaceholder] = useState('할 일 입력');
    const [taskContentDetail, setTaskContentDetail] = useRecoilState(taskContentDetailSelector);


    function onClickAddButtonHandler(){
        console.log("detaiillength: ", taskContentDetail.contentDetail.length);
        if(taskContentDetail.contentDetail.length === 5){
            setSnackbar({show:true, type:'INFO', content:'할 일은 업무당 최대 5개 추가할 수 있습니다.'});
            return;
        }

        const id = _.random().toString();
        setTaskContentDetail((prev:TaskContentDetailFormState) => {
            const updatedContentDetail:TaskContentDetailItem[] = [...prev.contentDetail, {id, data:value}];
            return {...prev.contentDetail, contentDetail:updatedContentDetail};
        });
        setValue("");
    }


    return (
        <div className='my-2 flex items-center'>
            <div
                className='w-full flex items-center p-1'>
                <div className={`relative ml-1 min-h-[2.3rem] ${value.length === 0 && 'min-w-[6.8rem]'}`}>
                    <div className='relative flex items-center space-x-1 z-10'>
                        <div className='w-[320px] whitespace-nowrap text-transparent'>{value}</div>
                    </div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        className='w-[320px] absolute top-0 left-0 z-10 text-greyBlue hoverColorChange-ground200 appearance-none border-none focus:outline-none focus:border-none focus:ring-0'
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
                <button
                    type='button'
                    onClick={onClickAddButtonHandler}
                    className='text-primary'
                >
                    <IoIosAddCircle size={30}/>
                </button>
            </div>
        </div>
    );
}

export default TaskContentDetailAddInput;