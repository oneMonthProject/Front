import React from 'react';
import InputStyleSkeleton from "@/components/ui/skeleton/InputStyleSkeleton";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";

function ProjectSettingInfoSkeleton() {
    return (
        <>
            <div className="max-w-[1100px] space-y-10 px-8 mobile:px-4">
                <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 정보</div>
                <div className="w-full mx-auto grid pc:grid-cols-2 tablet:grid-cols-1 gap-10 place-content-between">
                    <InputStyleSkeleton label='프로젝트 이름'/>
                    <InputStyleSkeleton label='프로젝트 주제'/>
                    <div className='row-span-2'>
                        <div className="w-[380px] tablet:w-full space-y-10 mobile:mx-auto">
                            <InputStyleSkeleton label='시작 날짜'/>
                            <InputStyleSkeleton label='종료 날짜'/>
                        </div>
                    </div>
                    <InputStyleSkeleton label='기술 스택'/>

                </div>
                <div className="w-full my-4 flex items-center justify-center space-x-2">
                    <ButtonStyleSkeleton>초기화</ButtonStyleSkeleton>
                    <ButtonStyleSkeleton>저장</ButtonStyleSkeleton>
                </div>
            </div>
            <div className="mt-12 px-8 mobile:px-4 space-y-10">
                <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 종료</div>
                <div className="w-[380px] tablet:w-full flex flex-col items-start justify-center">
                    <ButtonStyleSkeleton>종료 투표 생성</ButtonStyleSkeleton>
                </div>
            </div>
        </>
    );
}

export default ProjectSettingInfoSkeleton;