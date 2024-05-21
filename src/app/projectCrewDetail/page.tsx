import React from 'react';
import ProfileSection from "@/components/project/crews/detail/ProfileSection";
import {GrScorecard} from "@react-icons/all-files/gr/GrScorecard";
import CrewTaskHistory from "@/components/project/crews/detail/CrewTaskHistory";

function CrewDetailPage() {
    return (
        <>
            <section className='tablet:py-3 border-b-2 border-gray-200'>
                <ProfileSection/>
            </section>
            <section className='mt-12'>
                <div className='flex items-center tablet:text-3xl mobile:text-xl font-semibold text-greyDarkBlue'>
                    <GrScorecard className='tablet:text-[1.5rem]'/>
                    <h3 className='ml-2'>업무 이력</h3>
                </div>
                <CrewTaskHistory/>
            </section>
        </>
    );
}

export default CrewDetailPage;