import React from 'react';
import MultiPositionSelect from "@/components/post/register/MultiPositionSelect";
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";
import {SelectItem} from "@/utils/type";

function ProjectRecruitPosition() {
    const [{positionIds}, setPositionIds] = useRecoilState(postFieldSelector('positionIds'));

    function onSetPositionIds(item:SelectItem<string, string>[]){
        const positionIds = item.map(({value}) => BigInt(value));
        setPositionIds({positionIds});
    }

    return (
        <MultiPositionSelect positions={positionIds} setPositions={onSetPositionIds} singleItemType="positionId"/>
    );
}

export default ProjectRecruitPosition;