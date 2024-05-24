'use client';

import React from 'react';
import Select from "@/components/ui/selector/Select";
import {projectNoticeCurrentFormState, ProjectNoticeTaskForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {TiMinus} from "@react-icons/all-files/ti/TiMinus";
import {TiInfoOutline} from "@react-icons/all-files/ti/TiInfoOutline";
import {PROJECT_NOTICE_TYPE as PNT, TaskPointOptions} from "@/app/project/@notice/_utils/constant";
import {PointTypeName as Name, PointTypeValue as Value, ProjectNoticeTask} from "@/app/project/@notice/_utils/type";


function TaskPointSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    const {form: {content, scoreTypeId}} = currentNoticeForm as ProjectNoticeTaskForm;

    function onChangeTaskPointHandler(selectItem: SelectItem<Name, Value>) {
        const scoreTypeId = selectItem.value;
        const updatedNotice: ProjectNoticeTask = {...currentNoticeForm!.form, scoreTypeId};
        const updatedNoticeForm: ProjectNoticeTaskForm = {name: PNT.WORK.value, form: updatedNotice};
        setCurrentNoticeForm(updatedNoticeForm);
    }


    const selectorOptions = content.includes("만료")
        ? Object.values(TaskPointOptions).filter(v => v.name !== 'plus')
        : Object.values(TaskPointOptions);

    return (
        <section className='mx-auto'>
            {
                content.includes("만료")
                &&
                (
                    <div
                        className='w-full flex items-center justify-center mt-6 mb-2 text-xl text-grey800 font-semibold'>
                        <TiInfoOutline size={23} className='mr-1'/>만료된 업무는
                        <div className='text-red-700/60 flex items-center'>
                            <TiMinus className='ml-3 mr-1' size={15}/>신뢰점수
                        </div>
                        만 부여가능합니다.
                    </div>
                )
            }
            <div className='max-w-[150px] mx-auto mt-6 flex flex-col items-stretch'>
                <label className='max-w-[150px] tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>신뢰점수
                    부여</label>
                <Select
                    items={selectorOptions}
                    label=''
                    setValue={onChangeTaskPointHandler}
                    value={selectorOptions.find(v => v.value === scoreTypeId)!}/>
            </div>
        </section>
    );
}

export default TaskPointSelector;