'use client';

import React from 'react';
import ProjectSettingForm from '@/components/project/setting/ProjectSettingForm';
import {useProjectInfo} from "@/hooks/useProjectInfo";

function SettingPage() {
    const {data, isFetching} = useProjectInfo();


    return (
        <section className='w-full mx-auto'>
            isFetching ? <div>loading...</div> : <ProjectSettingForm data={data!}/>
        </section>
    );
}

export default SettingPage;