'use client';

import React from 'react';
import Select from "@/components/ui/Select";
import {projectNoticeCurrentFormState, ProjectNoticeTaskForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {PointTypeValue, SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {POINT_TYPE} from "@/utils/constant";

const taskPointOptions: SelectItem[] = [
    {
        name: '점수 타입 선택',
        value: null
    },
    {
        name: '- 신뢰점수',
        value: POINT_TYPE.minus
    },
    {
        name: '+ 신뢰점수',
        value: POINT_TYPE.plus
    }
]

function TaskPointSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeTaskPointHandler(selectItem: SelectItem) {
        const scoreTypeId = selectItem.value as PointTypeValue;
        const updatedNoticeForm = {...currentNoticeForm, scoreTypeId} as ProjectNoticeTaskForm;
        setCurrentNoticeForm(updatedNoticeForm);
    }

    return (
        <section className='max-w-[150px] mx-auto mt-12 flex flex-col items-stretch'>
            <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>신뢰점수 부여</label>
            <Select
                items={taskPointOptions}
                label=''
                setValue={onChangeTaskPointHandler}
                value={taskPointOptions.find(v => v.value === (currentNoticeForm as ProjectNoticeTaskForm).scoreTypeId)!}/>
        </section>
    );
}

export default TaskPointSelector;