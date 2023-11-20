import React from 'react';
import TrustGradeBadge from "@/components/ui/TrustGradeBadge";

function ProjectInfo() {
    return (
        <section className='w-full tablet:mt-[40px] mobile:mt-[10px] tablet:flex mobile:flex-col items-center justify-start'>
            <div className='flex-col pr-20 tablet:border-r-[3px] tablet:border-grey150'>
                <div className='tablet:text-5xl mobile:text-[24px] font-medium'>trustcrews</div>
                <div className='tablet:mt-2 tablet:text-[1.5rem] mobile:text-[14px] text-grey800 font-semibold'>팀 프로젝트 매칭 서비스 개발</div>
            </div>
            <div className='h-full tablet:pl-20 mobile:p-1 mobile:mt-3 flex-col tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
                <div className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-grey800 text-center'>모임 등급</div>
                    <div><TrustGradeBadge text='1등급' size='sm' color='red'/></div>
                </div>
                <div className='flex items-center my-3'>
                    <div className='w-[5rem] mr-10 text-center text-grey800'>기간</div>
                    <div>2023.12.05 ~ 2023.01.10</div>
                </div>
            </div>
        </section>
    );
}

export default ProjectInfo;