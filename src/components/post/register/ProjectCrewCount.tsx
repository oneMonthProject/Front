import React from 'react';
import Select from "@/components/ui/Select";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import {recruitmentCountList as rcList} from "@/app/register/_utils/constant";
import {RecruitCountValue as RCValue, RecruitCountName as RCName} from "@/app/register/_utils/type";

function ProjectCrewCount() {
const [{crewNumber}, setCrewNumber] = useRecoilState(projectFieldSelector('crewNumber'));

    const {name, value} = rcList.find(({value}) => value === crewNumber)!;
    return (
        <Select
            value={{name, value}}
            setValue={(item:SelectItem<RCName, RCValue>) => setCrewNumber({crewNumber: item.value})}
            items={rcList}
            label="모집 인원"
            placeholder="모집 인원을 선택해주세요."
        />
    );
}

export default ProjectCrewCount;