import React, {Suspense} from 'react';
import ProfileSection from "@/components/project/crews/detail/ProfileSection";
import CrewTaskHistory from "@/components/project/crews/detail/CrewTaskHistory";

// todo - params.userId 로 크루 상세정보 조회
// todo - profile fallback
function Page({params}:{params:{userId:string;}}) {
    return (
        <section className='-mt-14 px-1'>
            <section className='pc:max-w-[1000px] tablet:max-w-[700px] mx-auto border-b-2 border-gray-200'>
                <Suspense>
                    <ProfileSection/>
                </Suspense>
            </section>
            <section>
                <h3>{params.userId}의 프로젝트 업무 이력</h3>
                <CrewTaskHistory/>
            </section>
        </section>
    );
}

export default Page;