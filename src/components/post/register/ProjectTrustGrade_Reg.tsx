import React from 'react';
import TrustGradeSelect from "@/components/post/register/TrustGradeSelect";
import {useRecoilState, useSetRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import {TRUST_GRADE as TG} from "@/app/project/@setting/_utils/constant";
import {TrustGradeIdType as TValue, TrustGradeNameType as TName} from "@/app/project/@setting/_utils/type";

function ProjectTrustGrade_Reg() {
    const [{trustGradeId}, setTrustGradeId] = useRecoilState(projectFieldSelector('trustGradeId'));

    const {name, id} = Object.values(TG).find(({id}) => id === trustGradeId)!;

    return (
        <TrustGradeSelect
            trustGrade={{name, value:id}}
            setTrustGrade={(item:SelectItem<TName, TValue>) => setTrustGradeId(item.value)}
        />
    );
}

export default ProjectTrustGrade_Reg;