import React from 'react';
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import {TechStackValueType} from "@/utils/type";

function ProjectTech() {
    const [{technologyIds}, setTechIds] = useRecoilState(projectFieldSelector('technologyIds'));

    return (
        <TechStackSelect
            techStacks={technologyIds!}
            setTechStacks={
                (item: readonly TechStackValueType[]) => setTechIds({technologyIds: item})
            }
            label="사용 스택"
        />
    );
}

export default ProjectTech;