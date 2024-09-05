import React from 'react';
import Skeleton from "@/components/ui/skeleton/Skeleton";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";
import InputStyleSkeleton from "@/components/ui/skeleton/InputStyleSkeleton";

function ProjectSettingBoardInfoSkeleton() {
    return (
        <div className="max-w-[1100px] space-y-10 px-8 mobile:px-4">
            <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">모집 게시글</div>
            <div className="w-full mx-auto grid pc:grid-cols-2 tablet:grid-cols-1 gap-10 place-content-between">
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <div className="relative mobile:text-sm">
                        <span className="text-gray-700">
                            모집 상태
                        </span>
                        <Skeleton className='h-8 w-14 mt-2 flex-shrink-0 rounded-full'/>
                    </div>
                </div>
                <InputStyleSkeleton label='게시글 제목'/>
                <InputStyleSkeleton label='모집 분야'/>
                <InputStyleSkeleton label='연락 방법'/>
                <div className="w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto col-span-2">
                    <div className="relative mobile:text-sm">
                        <span className="text-gray-700">
                           프로젝트 소개
                        </span>
                        <Skeleton className='w-full h-[250px] py-2 px-4'/>
                    </div>
                </div>
            </div>
            <div className="w-full my-4 flex items-center justify-center space-x-2">
                <ButtonStyleSkeleton>초기화</ButtonStyleSkeleton>
                <ButtonStyleSkeleton>저장</ButtonStyleSkeleton>
            </div>
        </div>
    );
}

export default ProjectSettingBoardInfoSkeleton;