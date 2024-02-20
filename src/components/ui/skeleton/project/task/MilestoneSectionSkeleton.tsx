'use client';

import React from 'react';
import MilestoneListSkeleton from "@/components/ui/skeleton/project/task/MilestoneListSkeleton";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";

function MilestoneSectionSkeleton() {
    return (
        <>
            <ButtonStyleSkeleton size='md' className='mb-4'>
                <span className='flex items-center'>
                  <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                  마일스톤 추가
                </span>
            </ButtonStyleSkeleton>
            <MilestoneListSkeleton />
            <div className='my-10 w-full flex items-center justify-center space-x-2 '>
                <span className='w-[8px] h-[8px] rounded-full bg-gray-200 animate-pulse'></span>
                <span className='w-[8px] h-[8px] rounded-full bg-gray-200 animate-pulse'></span>
            </div>
        </>
    );
}

export default MilestoneSectionSkeleton;