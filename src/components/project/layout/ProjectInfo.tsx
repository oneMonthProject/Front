'use client';
import React from 'react';
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import {useQueryString} from "@/hooks/useQueryString";
import {getMyProjectDetail} from "@/service/project";
import {useQuery} from "@tanstack/react-query";
import {getCookie} from "cookies-next";
import {useProjectInfo} from "@/hooks/useProjectInfo";

 function ProjectInfo() {
    const {data, isLoading, error} = useProjectInfo();

    console.log("data:::: ",data);
    if(isLoading) return <div>is Loading</div>;
     if(error) return <div>{error.message}</div>

    const {name, subject, trustGrade, status, startDate, endDate} = data;

    return (
        <section className='w-full tablet:mt-[40px] mobile:mt-[10px] tablet:flex mobile:flex-col items-center justify-start' data-role='rowgroup'>
            <div className='flex-col pr-20 tablet:border-r-[3px] tablet:border-grey150' data-role='row'>
                <div className='tablet:text-5xl mobile:text-[24px] font-medium' data-role='cell'>{name}</div>
                <div className='tablet:mt-2 tablet:text-[1.5rem] mobile:text-[14px] text-grey800 font-semibold' data-role='cell'>{subject}</div>
            </div>
            <div className='h-full tablet:pl-20 mobile:p-1 mobile:mt-3 flex-col tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
                <div className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-grey800 text-center'>모임 등급</div>
                    <div><TrustGradeBadge text={trustGrade.name} size='sm'/></div>
                </div>
                <div className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-center text-grey800'>기간</div>
                    <div>{`${startDate} ~ ${endDate}`}</div>
                </div>
            </div>
        </section>
    );
}

export default ProjectInfo;