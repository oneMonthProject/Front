'use client';

import React from 'react';
import TrustGradeSelect from "@/components/post/register/TrustGradeSelect";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {projectInfoFieldSelector} from "@/store/project/setting/ProjectSettingFormStateStore";
import {TrustGradeNameType as Name, TrustGradeValueType as Value} from "@/app/project/@setting/_utils/type";

function ProjectTrustGrade() {
    const [{trustGradeId}, setTrustGradeId] = useRecoilState(projectInfoFieldSelector('trustGradeId'));

    return (
        <TrustGradeSelect
            trustGradeId={trustGradeId!}
            setTrustGrade={(item: SelectItem<Name, Value>) => {
                setTrustGradeId({trustGradeId: item.value});
            }}
        />
    );
}

export default ProjectTrustGrade;