'use client';

import React from 'react';
import Skeleton from "@/components/ui/skeleton/Skeleton";
import BadgeStyleSkeleton from "@/components/ui/skeleton/BadgeStyleSkeleton";

function ProjectInfoSkeleton() {
    return (
        <section
            className='tablet:flex mobile:flex-col items-center justify-start w-full tablet:mt-[40px] mobile:mt-[10px] '>
            <div className='flex-col space-y-2 tablet:w-[460px] mobile:w-full pr-20 tablet:border-r-[3px] tablet:border-grey150'>
                <Skeleton sizeClassName='h-[50px] mobile:h-[36px]'/>
                <Skeleton sizeClassName='h-[30px] mobile:h-[21px]'/>
            </div>
            <div
                className='h-full tablet:pl-20 mobile:p-1 mobile:mt-3 flex-col tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
                <div aria-hidden={true} className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-center text-grey800'>기간</div>
                    <Skeleton sizeClassName='w-[200px] h-[20px]'/>
                </div>
            </div>
        </section>
    );
}

export default ProjectInfoSkeleton;