import React from 'react';
import TaskStatusSelector from "@/components/project/task/task/TaskStatusSelector";
import {useRecoilState} from "recoil";
import {taskModalFieldSelector} from "@/store/project/task/TaskStateStore";

function TaskProgressStatus() {
    const [type] = useRecoilState(taskModalFieldSelector('type'));

    return type === 'modify' && (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">진행</label>
            <div
                className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
                <TaskStatusSelector/>
            </div>
        </div>

    );
}

export default TaskProgressStatus;