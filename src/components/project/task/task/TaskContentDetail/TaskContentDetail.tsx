'use client';

import React, {useState} from 'react';
import {RiAddLine} from "@react-icons/all-files/ri/RiAddLine";
import TaskContentDetailAddInput from "@/components/project/task/task/TaskContentDetail/TaskContentDetailAddInput";
import TaskContentDetailInput from "@/components/project/task/task/TaskContentDetail/TaskContentDetailInput";
import {randomUUID} from "crypto";

const taskContentDetail = {
    contentDetail: [
        {
            data: '업무내용 11111111111111111111',
            id: 1
        },
        {
            data: '업무내용 2222222222222222222',
            id: 2
        },
        {
            data: '업무내용 3333333333',
            id: 3
        },
        {
            data: '업무내용 444444444444',
            id: 4
        }
    ]
}


function TaskContentDetail() {
    const [showAddElement, setShowAddElement] = useState(false);
    // const [taskContentDetail, setTaskContentDetail] = useRecoilState(taskContentDetailSelector);


    return (
        <div className='w-full flex-col pb-3'>
            <div className='w-full py-3 flex justify-center text-xl font-semibold text-gray-700 bg-gray-300/40 rounded-sm'>할 일</div>
            <button
                onClick={() => setShowAddElement(true)}
                className='w-full flex items-center space-x-1 py-2 px-1 text-lg text-gray-600 leading-[2.15rem] font-semibold bg-gray-50'>
                <RiAddLine/>
                <span>추가</span>
                <span className='text-sm text-gray-500'>(최대 5개)</span>
            </button>
            <div className='max-h-[225px] overflow-y-auto'>
                {showAddElement && <TaskContentDetailAddInput setIsOpen={setShowAddElement}/>}
                {taskContentDetail.contentDetail?.map((v) => <TaskContentDetailInput key={v.id} initContents={v.data}/>)}
            </div>
        </div>
    );
}

export default TaskContentDetail;