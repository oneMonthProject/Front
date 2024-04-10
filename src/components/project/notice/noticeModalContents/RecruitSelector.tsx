'use client';

import React from 'react';
import Select from "@/components/ui/Select";
import {projectNoticeCurrentFormState, ProjectNoticeRecruitForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {
    PROJECT_NOTICE_TYPE as PNT,
    RecruitOption,
    RecruitOptionNameType,
    RecruitOptionValueType
} from "@/app/project/@notice/_utils/constant";
import {ProjectNoticeRecruit} from "@/app/project/@notice/_utils/type";

const selectItems = Object.values(RecruitOption);

function RecruitSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeJoinPermitHandler(selectItem: SelectItem<RecruitOptionNameType, RecruitOptionValueType>) {
        const updatedNoticeRecruit: ProjectNoticeRecruit = {...currentNoticeForm!.form, isPermit: selectItem.value};
        const updatedNoticeRecruitForm: ProjectNoticeRecruitForm = {
            name: PNT.RECRUIT.value,
            form: updatedNoticeRecruit
        };
        setCurrentNoticeForm(updatedNoticeRecruitForm);

    }

    const selectedValue = selectItems
        .find(v => v.value === (currentNoticeForm as ProjectNoticeRecruitForm).form.isPermit)!;

    return (
        <section className='max-w-[150px] mx-auto my-7 flex flex-col items-stretch'>
            <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>프로젝트
                합류
            </label>
            <Select
                items={selectItems}
                label=''
                setValue={onChangeJoinPermitHandler}
                value={selectedValue}/>
        </section>
    );
}

export default RecruitSelector;