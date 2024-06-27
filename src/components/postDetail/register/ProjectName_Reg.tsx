import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectName_Reg() {
    const [{name}, setProjectName] = useRecoilState(projectFieldSelector('name'))

    return (
        <Input
            id="projectName"
            label="프로젝트 이름"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setProjectName({name: e.target.value})}
        />
    );
}

export default ProjectName_Reg;