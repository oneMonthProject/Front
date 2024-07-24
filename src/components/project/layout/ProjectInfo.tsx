'use client';

import React, {useEffect} from 'react';
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import {useRecoilValueLoadable, useResetRecoilState} from "recoil";
import {projectInfoState} from "@/store/project/ProjectInfoStateStore";
import {ProjectInfoSkeleton} from "@/components/ui/skeleton/project/task";

function ProjectInfo({projectId, userId}: { projectId: string, userId: string }) {
    const stateParam = JSON.stringify({projectId, userId});
    const {state, contents} = useRecoilValueLoadable(projectInfoState(stateParam));

    const resetProjectInfo = useResetRecoilState(projectInfoState(stateParam));
    useEffect(() => {
        // 프로젝트 상세 페이지 벗어나면 프로젝트 정보 초기화
        return () => resetProjectInfo();
    }, [resetProjectInfo]);

    if (state === 'loading' || contents.result !== "success") return <ProjectInfoSkeleton/>;

    const {name, subject, trustGrade, startDate, endDate} = contents.data;

    return (
        <section
            className='tablet:flex mobile:flex-col items-center justify-start w-full tablet:mt-[40px] mobile:mt-[10px] '>
            <div className='flex-col pr-20 tablet:w-[460px] mobile:w-full tablet:border-r-[3px] tablet:border-grey150'>
                <div className='tablet:text-5xl mobile:text-[24px] font-medium'>
                    <div aria-hidden={true}>{name}</div>
                    <div className='sr-only'>프로젝트 이름 : {name}</div>
                </div>
                <div className='tablet:mt-2 tablet:text-[1.5rem] mobile:text-[14px] text-grey800 font-semibold'>
                    <div aria-hidden={true}>{subject}</div>
                    <div className='sr-only'>프로젝트 주제 : {subject}</div>
                </div>
            </div>
            <div
                className='h-full tablet:pl-20 mobile:p-1 mobile:mt-3 flex-col tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
                <div aria-hidden={true} className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-center text-grey800'>기간</div>
                    <div>{`${startDate} ~ ${endDate}`}</div>
                </div>
                <span
                    className='sr-only'>프로젝트 기간 : {`${startDate} ~ ${endDate}`}</span>
            </div>
        </section>
    );
}

export default ProjectInfo;