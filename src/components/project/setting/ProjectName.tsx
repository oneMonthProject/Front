import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {projectInfoFieldSelector} from "@/store/project/setting/ProjectSettingFormStateStore";

function ProjectName() {
    const [{projectName}, setProjectName] = useRecoilState(projectInfoFieldSelector('projectName'));

    return (
        <Input id="projectName"
               label="프로젝트 이름"
               placeholder="이름을 입력해주세요."
               value={projectName}
               onChange={(e) => {
                   const name = e.target.value as string;
                   setProjectName({projectName:name})
               }}
        />
    );
}

export default ProjectName;