'use client';
import React from 'react';
import useProjectCrewList from "@/hooks/useProjectCrewList";
import {ProjectMember, SelectItem} from "@/utils/type";
import Select from "@/components/ui/Select";
import {useRecoilState} from "recoil";
import {TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";

function ProjectCrewSelect() {
    const [taskModalForm, setTaskModalForm] = useRecoilState(taskModalFormState);
    const {projectMembers} = useProjectCrewList();

    const projectCrewListItems = [{name: '', value: ''}];
    projectMembers.forEach((v: ProjectMember) => {
        projectCrewListItems.push({name: v.user.nickname, value: v.projectMemberId.toString()})
    });

    const selectedCrew = projectCrewListItems
        .find((v: SelectItem) => v.value === taskModalForm?.assignedUser?.projectMemberId) || projectCrewListItems[0];

    function setSelectedCrew(item: SelectItem) {
        const updated = {
            ...taskModalForm as TaskModalForm,
            assignedUser: {projectMemberId: item.value as bigint, nickname: item.name}
        };
        setTaskModalForm(updated);
    }

    return (
        <Select value={selectedCrew} setValue={setSelectedCrew} items={projectCrewListItems}/>
    )
}

export default ProjectCrewSelect;