'use client';

import React from 'react';
import Select from "@/components/ui/selector/Select";
import {projectNoticeTaskScoreState} from "@/store/project/notice/ProjectNoticeStateStore";
import {useRecoilState} from "recoil";
import {TiMinus} from "@react-icons/all-files/ti/TiMinus";
import {TiInfoOutline} from "@react-icons/all-files/ti/TiInfoOutline";
import {TaskPointOptions} from "@/app/project/@notice/_utils/constant";

const taskPointOptions = Object.values(TaskPointOptions);
function TaskPointSelector({isTaskExpired}:{isTaskExpired:boolean}) {
    const [{scoreTypeId}, setScoreTypeId] = useRecoilState(projectNoticeTaskScoreState);

    const selectItems = isTaskExpired ? taskPointOptions.filter(v => v.name !== '+ 신뢰점수') : taskPointOptions;
    return (
        <section className='mx-auto'>
            {
                isTaskExpired
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
                    items={selectItems}
                    label=''
                    setValue={(item) => setScoreTypeId({scoreTypeId: item.value})}
                    value={selectItems.find(v => v.value === scoreTypeId)!}/>
            </div>
        </section>
    );
}

export default TaskPointSelector;