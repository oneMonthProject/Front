'use client';

import React, {Suspense, useEffect, useState} from 'react';
import ProjectSettingForm from '@/components/project/setting/ProjectSettingForm';

function SettingPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])
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