'use client';

import React from 'react';
import {ProjectInfoSkeleton} from "@/components/ui/skeleton/project/task";
import useProjectInfoSummary from "@/hooks/useProjectInfoSummary";

function ProjectInfo({projectId, userId}: { projectId: string, userId: string }) {
    const {data, isFetching} = useProjectInfoSummary(projectId);

    if (isFetching) return <ProjectInfoSkeleton/>;

    const {projectName, projectSubject, startDate, endDate} = data!.data!;

    return (
        <section
            className='tablet:flex mobile:flex-col items-center justify-start w-full tablet:mt-[40px] mobile:mt-[10px] '>
            <div className='flex-col pr-20 tablet:w-[460px] mobile:w-full tablet:border-r-[3px] tablet:border-grey150'>
                <div className='tablet:text-5xl mobile:text-[24px] font-medium'>
                    <div aria-hidden={true}>{projectName}</div>
                    <div className='sr-only'>프로젝트 이름 : {projectName}</div>
                </div>
                <div className='tablet:mt-2 tablet:text-[1.5rem] mobile:text-[14px] text-grey800 font-semibold'>
                    <div aria-hidden={true}>{projectSubject}</div>
                    <div className='sr-only'>프로젝트 주제 : {projectSubject}</div>
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