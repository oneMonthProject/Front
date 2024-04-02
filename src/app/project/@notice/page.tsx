'use client';

import React, {Suspense, useEffect, useState} from 'react';
import NoticeList from "@/components/project/notice/NoticeList";
import NoticeModal from "@/components/project/notice/NoticeModal";
import useClientMount from "@/hooks/useClientMount";


function NoticePage() {
    const mounted = useClientMount();

    return (
        <section className='mb-20 tablet:basis-4/5'>
            {
                mounted &&
                <Suspense fallback={<div>loading...</div>}>
                    <NoticeList/>
                </Suspense>
            }
            <NoticeModal/>
        </section>
    );
}

export default NoticePage;