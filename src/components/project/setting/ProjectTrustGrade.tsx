'use client';

import React from 'react';
import TrustGradeSelect from "@/components/post/register/TrustGradeSelect";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {projectInfoFieldSelector} from "@/store/project/setting/ProjectSettingFormStateStore";
import {TrustGradeIdType} from "@/app/project/@setting/_utils/type";
import {TRUST_GRADE as TG} from "@/app/project/@setting/_utils/constant";

function ProjectTrustGrade() {
    const [{trustGradeId}, setTrustGradeId] = useRecoilState(projectInfoFieldSelector('trustGradeId'));

    const {name, id} = Object.values(TG).find(({id}) => id === trustGradeId)!;

    return (
        <TrustGradeSelect
            trustGrade={{name, value:id}}
            setTrustGrade={(item: SelectItem<string, TrustGradeIdType>) => {
                setTrustGradeId({trustGradeId: item.value});
            }}
        />
    );
}

export default ProjectTrustGrade;