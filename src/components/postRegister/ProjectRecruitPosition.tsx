import React from 'react';
import MultiPositionSelect from "@/components/postRegister/MultiPositionSelect";
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectRecruitPosition() {
    const [{positionIds}, setPositionIds] = useRecoilState(postFieldSelector('positionIds'));

    return (
        <MultiPositionSelect positions={positionIds!}
                             setPositions={(item) => setPositionIds({positionIds: item})}/>
    );
}

export default ProjectRecruitPosition;