'use client';

import React from 'react';
import Select from "@/components/ui/Select";
import {projectNoticeCurrentFormState, ProjectNoticeTaskForm} from "@/store/project/notice/ProjectNoticeStateStore";
import {PointTypeValue, SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {POINT_TYPE} from "@/utils/constant";
import {TiMinus} from "@react-icons/all-files/ti/TiMinus";

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
        <section className='mx-auto mt-12 flex flex-col items-stretch'>
            {
                currentNoticeForm?.content.includes("만료") ?
                    (
                        <div className='w-full flex items-center justify-center mb-2 tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold'>
                            확인을 누르면
                            <div className='text-gray-500 flex items-center'><TiMinus className='ml-3 mr-1' size={15}/>신뢰점수</div>
                            가 부여됩니다.
                        </div>
                    )
                    :
                    (
                        <>
                            <label className='max-w-[150px] tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>신뢰점수
                                부여</label>
                            <Select
                                items={taskPointOptions}
                                label=''
                                setValue={onChangeTaskPointHandler}
                                value={taskPointOptions.find(v => v.value === (currentNoticeForm as ProjectNoticeTaskForm).scoreTypeId)!}/>
                        </>
                    )
            }
        </section>
    );
}

export default TaskPointSelector;