'use client';

import React, {useEffect} from 'react';
import ProjectSettingForm from '@/components/project/setting/ProjectSettingForm';
import {useRecoilValueLoadable, useResetRecoilState, useSetRecoilState} from "recoil";
import {projectSettingFormInit} from "@/store/project/setting/ProjectSettingFormStateStore";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";

function SettingPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {
    const {state} = useRecoilValueLoadable(projectSettingFormInit);
    const setProjectIdState = useSetRecoilState(projectIdState);
    const resetProjectIdState = useResetRecoilState(projectIdState);

    useEffect(() => {
        setProjectIdState(projectId);

        return () => resetProjectIdState();
    },[projectId, setProjectIdState, resetProjectIdState]);

    if(state === 'loading') return <div>loading...</div>;

    return (
        <section className='w-full mx-auto'>
            <ProjectSettingForm />
        </section>
    );
}

export default SettingPage;