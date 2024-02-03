'use client';

import React from 'react';
import Select from "@/components/ui/Select";
import {projectNoticeCurrentFormState, ProjectNoticeRecruitForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";

const selectItems: SelectItem[] = [
    {name: '수락', value: 'true'},
    {name: '거절', value: 'false'}
]

function RecruitSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeJoinPermitHandler(selectItem: SelectItem) {
        if (currentNoticeForm instanceof ProjectNoticeRecruitForm) {
            const updatedNoticeForm = {...currentNoticeForm, isPermit: selectItem.value};
            setCurrentNoticeForm(updatedNoticeForm);
        }
    }


    return (
        <section className='max-w-[150px] mx-auto my-7 flex flex-col items-stretch'>
            <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>프로젝트
                합류</label>
            <Select
                items={selectItems}
                label=''
                setValue={onChangeJoinPermitHandler}
                value={
                    {
                        name: (currentNoticeForm as ProjectNoticeRecruitForm).isPermit
                            ? '수락'
                            : '거절',
                        value: (currentNoticeForm as ProjectNoticeRecruitForm).isPermit.toString()
                    }
                }/>
        </section>
    );
}

export default RecruitSelector;