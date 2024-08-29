import React from 'react';
import ProjectCrewSelect from "@/components/project/ProjectCrewSelect";
import {useRecoilValue} from "recoil";
import {taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

function TaskAssignedCrew() {
    const {progressStatusCode} = useRecoilValue(taskProgressModFieldSelector)

    return (
        <div className='flex'>
            <label htmlFor="content" className="text-gray-700 font-semibold self-center">담당</label>
            <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
                <ProjectCrewSelect disabled={progressStatusCode === TASK_STATUS.PS003.value}/>
            </div>
        </div>
    );
}

export default TaskAssignedCrew;