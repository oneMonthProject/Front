import React from 'react';
import Input from "@/components/ui/form/Input";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import {useRecoilState} from "recoil";

function ProjectSubject_Reg() {
    const [{subject}, setSubject] = useRecoilState(projectFieldSelector('subject'));
    return (
        <Input
            id="projectSubject"
            label="프로젝트 주제"
            value={subject}
            onChange={(e) => setSubject({subject: e.target.value})}
        />

    );
}

export default ProjectSubject_Reg;