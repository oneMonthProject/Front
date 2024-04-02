'use client';

import React, {Suspense, useEffect, useState} from 'react';
import ProjectSettingForm from '@/components/project/setting/ProjectSettingForm';
import useClientMount from "@/hooks/useClientMount";

function SettingPage() {
    const mounted = useClientMount();

    return (
        <section className='w-full mx-auto'>
            <Suspense fallback={<div>loading...</div>}>
                {
                    mounted && <ProjectSettingForm/>
                }
            </Suspense>
        </section>
    );
}

export default SettingPage;