'use client';

import React from 'react';
import Select from "@/components/ui/selector/Select";
import {projectNoticeRecruitPermitState} from "@/store/project/notice/ProjectNoticeStateStore";
import {useRecoilState} from "recoil";
import {RecruitOption} from "@/app/project/@notice/_utils/constant";

const selectItems = Object.values(RecruitOption);

function RecruitSelector() {
    const [{isPermit}, setIsPermit] = useRecoilState(projectNoticeRecruitPermitState);

    return (
        <section className='max-w-[150px] mx-auto my-7 flex flex-col items-stretch'>
            <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>프로젝트
                합류
            </label>
            <Select
                items={selectItems}
                label=''
                setValue={(item) => setIsPermit({isPermit: item.value})}
                value={selectItems.find(v => v.value === isPermit)!}/>
        </section>
    );
}

export default RecruitSelector;