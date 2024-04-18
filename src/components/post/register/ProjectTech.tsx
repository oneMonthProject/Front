import React from 'react';
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectTech() {
    const [{technologyIds}, setTechIds] = useRecoilState(projectFieldSelector('technologyIds'));

    return (
        <TechStackSelect
            techStacks={technologyIds}
            setTechStacks={
                (item: TechStackValueType[]) => setTechIds({technologyIds: item})
            }
            label="사용 스택"
            placeholder="사용 스택을 선택해주세요."
        />
    );
}

export default ProjectTech;