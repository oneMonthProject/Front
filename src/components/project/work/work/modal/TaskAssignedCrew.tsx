import React from 'react';
import ProjectCrewSelect from "@/components/project/ProjectCrewSelect";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    TaskAddModalField,
    taskModalDataFieldSelector, taskModalEditDisabledSelector,
    TaskModalType,
    TaskModModalField
} from "@/store/project/task/TaskStateStore";

function TaskAssignedCrew({modalType}: { modalType: TaskModalType }) {
    const disabled = useRecoilValue(taskModalEditDisabledSelector(modalType));
    const [assignedUserId, setAssignedUserId] = useRecoilState(taskModalDataFieldSelector({
        modalType,
        fieldKey: 'assignedUserId'
    }));

    const selectedAssignedUserId = modalType === 'add'
        ? assignedUserId as TaskAddModalField<'assignedUserId'>
        : assignedUserId as TaskModModalField<'assignedUserId'>;

    console.log("selectedAssignedUserId: ", selectedAssignedUserId);

    return (
        <div className='flex'>
            <label htmlFor="content" className="text-gray-700 font-semibold self-center">담당</label>
            <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
                <ProjectCrewSelect
                    disabled={disabled}
                    assignedUserId={selectedAssignedUserId}
                    setAssignedUserId={setAssignedUserId}/>
            </div>
        </div>
    );
}

export default TaskAssignedCrew;