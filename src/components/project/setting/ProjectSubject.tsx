import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {projectInfoFieldSelector} from "@/store/project/setting/ProjectSettingFormStateStore";

function ProjectSubject() {
    const [{subject}, setSubject] = useRecoilState(projectInfoFieldSelector('subject'));

    return (
        <Input id="projectSubject"
               label="프로젝트 주제"
               placeholder="주제를 입력해주세요."
               value={subject}
               onChange={(e) => {
                   const subject = e.target.value as string;
                   setSubject({subject})
               }}
        />
    );
}

export default ProjectSubject;