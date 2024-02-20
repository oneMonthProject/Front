'use client';

import React from 'react';
import Select from "@/components/ui/Select";
import {projectNoticeCurrentFormState, ProjectNoticeTaskForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {PointTypeValue, SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {POINT_TYPE} from "@/utils/constant";
import {TiMinus} from "@react-icons/all-files/ti/TiMinus";
import {IoIosInformationCircleOutline} from "@react-icons/all-files/io/IoIosInformationCircleOutline";
import {TiInfoOutline} from "@react-icons/all-files/ti/TiInfoOutline";

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
];

const expiredTaskPointOptions:SelectItem[] = [
    {
        name: '점수 타입 선택',
        value: null
    },
    {
        name: '- 신뢰점수',
        value: POINT_TYPE.minus
    },
]

function TaskPointSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeTaskPointHandler(selectItem: SelectItem) {
        const scoreTypeId = selectItem.value as PointTypeValue;
        const updatedNoticeForm = {...currentNoticeForm, scoreTypeId} as ProjectNoticeTaskForm;
        setCurrentNoticeForm(updatedNoticeForm);
    }

    const selectorOptions = currentNoticeForm?.content.includes("만료") ? expiredTaskPointOptions : taskPointOptions;

    return (
        <section className='mx-auto'>
            {
                currentNoticeForm?.content.includes("만료") &&
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
                    value={selectorOptions.find(v => v.value === (currentNoticeForm as ProjectNoticeTaskForm).scoreTypeId)!}/>
            </div>
        </section>
    );
}

export default TaskPointSelector;