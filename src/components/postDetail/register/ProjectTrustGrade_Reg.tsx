import React from 'react';
import TrustGradeSelect from "@/components/postDetail/register/TrustGradeSelect";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import {TrustGradeNameType as Name, TrustGradeValueType as Value,} from "@/app/project/@setting/_utils/type";
import {SelectItem} from "@/utils/type";

function ProjectTrustGrade_Reg() {
    const [{trustGradeId}, setTrustGradeId] = useRecoilState(projectFieldSelector('trustGradeId'));

    return (
        <TrustGradeSelect
            trustGradeId={trustGradeId!}
            setTrustGrade={(item:SelectItem<Name, Value>) => setTrustGradeId({trustGradeId: item.value})}
        />
    );
}

export default ProjectTrustGrade_Reg;