'use client';

import React, {Suspense, useEffect, useState} from 'react';
import ProfileSection from "@/components/project/crews/detail/ProfileSection";
import {GrScorecard} from "@react-icons/all-files/gr/GrScorecard";
import CrewTaskHistory from "@/components/project/crews/detail/CrewTaskHistory";
import useClientMount from "@/hooks/useClientMount";

function CrewDetailPage() {
    const mounted = useClientMount();

    return (
        <>
            <section className='tablet:py-3 border-b-2 border-gray-200'>
                {
                    mounted &&
                    <Suspense fallback={<div>loading...</div>}>
                        <ProfileSection/>
                    </Suspense>
                }
            </section>
            <section className='mt-12'>
                <div className='flex items-center tablet:text-3xl mobile:text-xl font-semibold text-greyDarkBlue'>
                    <GrScorecard className='tablet:text-[1.5rem]'/>
                    <h3 className='ml-2'>업무 이력</h3>
                </div>
                {
                    mounted &&
                    <Suspense fallback={<div>loading...</div>}>
                        <CrewTaskHistory/>
                    </Suspense>
                }
            </section>
        </>
    );
}

export default CrewDetailPage;