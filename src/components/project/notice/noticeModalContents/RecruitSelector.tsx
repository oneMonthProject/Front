'use client';

import React from 'react';
import Select from "@/components/ui/Select";
import {projectNoticeCurrentFormState, ProjectNoticeRecruitForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";

const selectItems: SelectItem[] = [
    {name:'합류 여부 선택', value: ''},
    {name: '수락', value: true},
    {name: '거절', value: false}
]

function RecruitSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeJoinPermitHandler(selectItem: SelectItem) {
        if (currentNoticeForm instanceof ProjectNoticeRecruitForm) {
            const updatedNoticeForm = {...currentNoticeForm, isPermit: selectItem.value};
            setCurrentNoticeForm(updatedNoticeForm);
        }
    }

    const selectedValue:SelectItem = selectItems.find(v => v.value === (currentNoticeForm as ProjectNoticeRecruitForm).isPermit)!;

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