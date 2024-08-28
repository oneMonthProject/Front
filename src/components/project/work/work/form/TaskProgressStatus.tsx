import React from 'react';
import TaskStatusSelector from "@/components/project/work/work/TaskStatusSelector";
import {useRecoilState} from "recoil";
import {taskModalFieldSelector, taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";

function TaskProgressStatus() {
    const [type] = useRecoilState(taskModalFieldSelector('type'));
    const [{progressStatus, progressStatusCode}] = useRecoilState(taskProgressModFieldSelector)


    return type === 'modify' && (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">진행</label>
            <div
                className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
                {
                    progressStatusCode === TASK_STATUS.PS001.value || progressStatusCode === TASK_STATUS.PS003.value
                        ? <TaskStatusBadge size='sm' text={progressStatus}/>
                        : <TaskStatusSelector/>
                }
            </div>
        </div>

    );
}

export default TaskProgressStatus;