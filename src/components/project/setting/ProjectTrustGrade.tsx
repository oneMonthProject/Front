'use client';

import React from 'react';
import TrustGradeSelect from "@/components/post/register/TrustGradeSelect";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {projectInfoFieldSelector, ProjectSettingField} from "@/store/project/setting/ProjectSettingFormStateStore";
import {TrustGradeNameType as Name, TrustGradeValueType as Value} from "@/app/project/@setting/_utils/type";

function ProjectTrustGrade() {
    const [trustGradeId, setTrustGradeId] = useRecoilState(projectInfoFieldSelector('trustGradeId'));

    return (
        <TrustGradeSelect
            trustGradeId={trustGradeId as ProjectSettingField<'trustGradeId'>}
            setTrustGrade={(item: SelectItem<Name, Value>) => {
                setTrustGradeId(item.value);
            }}
        />
    );
}

export default ProjectTrustGrade;