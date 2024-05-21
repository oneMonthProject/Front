'use client';

import React, {useState} from 'react';
import {RiAddLine} from "@react-icons/all-files/ri/RiAddLine";
import TaskContentDetailAddInput from "@/components/project/task/task/TaskContentDetail/TaskContentDetailAddInput";
import TaskContentDetailInput from "@/components/project/task/task/TaskContentDetail/TaskContentDetailInput";
import {useRecoilState} from "recoil";
import {taskContentDetailSelector} from "@/store/project/task/TaskStateStore";

function TaskContentDetail() {
    const [showAddElement, setShowAddElement] = useState(false);
    const [taskContentDetail, setTaskContentDetail] = useRecoilState(taskContentDetailSelector);

    return (
        <div className='w-full flex-col pb-3'>
            <div
                className='w-full py-3 mobile:py-2 flex justify-center text-xl mobile:text-lg font-medium text-gray-700 bg-greyBlue/5 rounded-sm'>
                할 일
            </div>
            <button
                onClick={() => setShowAddElement((prev) => !prev)}
                className={`w-full flex items-center space-x-1 py-2 px-1 text-lg mobile:text-base text-gray-600 leading-[2.15rem] font-semibold ${showAddElement && 'bg-gray-50'}`}>
                <RiAddLine/>
                <span>추가</span>
                <span className='text-sm mobile:text-xs text-gray-500'>(최대 5개)</span>
            </button>
            {showAddElement && <TaskContentDetailAddInput setIsOpen={setShowAddElement}/>}
            <div className='max-h-[150px] overflow-y-auto'>
                {taskContentDetail.contents.length > 0
                    ? taskContentDetail.contents.map((v) =>
                        <TaskContentDetailInput key={v.id} initContents={v}/>
                    )
                    : (
                        <div className='mt-3 flex items-center justify-center text-xl noData h-[100px]'>
                            <span>데이터가 없습니다.</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TaskContentDetail;