import React, {Suspense} from 'react';
import ProfileSection from "@/components/project/crews/detail/ProfileSection";
import CrewTaskHistory from "@/components/project/crews/detail/CrewTaskHistory";
import {GrScorecard} from "@react-icons/all-files/gr/GrScorecard";

// todo - params.userId 로 크루 상세정보 조회
// todo - profile fallback
function Page({params}: { params: { userId: string; } }) {
    return (
        <section className='pc:max-w-[1200px] tablet:max-w-[700px] mx-auto -mt-14 px-1'>
            <section className='tablet:py-3 border-b-2 border-gray-200'>
                <Suspense>
                    <ProfileSection/>
                </Suspense>
            </section>
            <section className='mt-12'>
                <div className='flex items-center tablet:text-3xl mobile:text-xl font-semibold text-greyDarkBlue'>
                    <GrScorecard className='tablet:text-[1.5rem]'/>
                    <h3 className='ml-2'>업무 히스토리</h3>
                </div>
                <Suspense>
                    <CrewTaskHistory/>
                </Suspense>
            </section>
        </section>
    );
}

export default Page;