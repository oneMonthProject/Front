import React from 'react';
import ProjectCrewSelect from "@/components/project/ProjectCrewSelect";

function TaskAssignedCrew() {
    return (
        <div className='flex'>
            <label htmlFor="content" className="text-gray-700 font-semibold self-center">담당</label>
            <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
                <ProjectCrewSelect/>
            </div>
        </div>
    );
}

export default TaskAssignedCrew;