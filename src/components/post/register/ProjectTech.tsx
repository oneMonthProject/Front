import React from 'react';
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectTech() {
    const [{technologyIds}, setTechIds] = useRecoilState(projectFieldSelector('technologyIds'));

    function onSetTechIds(item:SelectItem<string,string>){
        const technologyIds = item.map(({value}) => BigInt(value));
        setTechIds({technologyIds});
    }

    return (
        <TechStackSelect
            techStacks={technologyIds}
            setTechStacks={onSetTechIds}
            label="사용 스택"
            placeholder="사용 스택을 선택해주세요."
            singleItemType='techStackIds'
        />
    );
}

export default ProjectTech;