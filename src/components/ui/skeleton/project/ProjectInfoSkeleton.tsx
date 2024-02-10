'use client';

import React from 'react';
import Skeleton from "@/components/ui/skeleton/Skeleton";
import BadgeStyleSkeleton from "@/components/ui/skeleton/BadgeStyleSkeleton";

function ProjectInfoSkeleton() {
    return (
        <section
            className='w-full tablet:mt-[40px] mobile:mt-[10px] tablet:flex mobile:flex-col items-center justify-start'>
            <div className='flex-col pr-20 tablet:border-r-[3px] tablet:border-grey150'>
                <Skeleton sizeClassName='w-[200px] h-[40px]'/>
                <Skeleton sizeClassName='w-[200px] h-[30px]'/>
            </div>
            <div
                className='h-full tablet:pl-20 mobile:p-1 mobile:mt-3 flex-col tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
                <div aria-hidden={true} className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-grey800 text-center'>모임 등급</div>
                    <BadgeStyleSkeleton className='tablet:w-20 tablet:h-8 mobile:w-16 mobile:h-6'/>
                </div>
                <div aria-hidden={true} className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-center text-grey800'>기간</div>
                    <Skeleton sizeClassName='w-[200px] h-[20px]'/>
                </div>
            </div>
        </section>
    );
}

export default ProjectInfoSkeleton;