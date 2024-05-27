import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {projectInfoFieldSelector, ProjectSettingField} from "@/store/project/setting/ProjectSettingFormStateStore";

function ProjectName() {
    const [projectName, setProjectName] = useRecoilState(projectInfoFieldSelector('projectName'));

    return (
        <Input id="projectName"
               label="프로젝트 이름"
               placeholder="이름을 입력해주세요."
               value={projectName as ProjectSettingField<'projectName'>}
               onChange={(e) => {
                   setProjectName(e.target.value)
               }}
        />
    );
}

export default ProjectName;