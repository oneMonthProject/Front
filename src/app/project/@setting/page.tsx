'use client';

import React from 'react';
import ProjectName from "@/components/project/setting/ProjectName";
import ProjectSubject from "@/components/project/setting/ProjectSubject";
import ProjectDate from "@/components/project/setting/ProjectDate";
import ProjectSettingFormResetButton from "@/components/project/setting/ProjectSettingFormResetButton";
import ProjectSettingFormSaveButton from "@/components/project/setting/ProjectSettingFormSaveButton";
import ProjectFinish from "@/components/project/setting/ProjectFinish";

function SettingPage({searchParams: {projectId}}: { searchParams: { projectId: string } }) {

    return (
        <section className='w-full mx-auto'>
            <div className="space-y-6 px-8 mobile:px-4">
                <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 정보 설정</div>
                <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3 px-3 mobile:px-0">
                    <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                        <ProjectName/>
                        <ProjectSubject/>
                    </div>
                    <ProjectDate/>
                </div>
                <div className="mb-6 text-end space-x-2 px-3 mobile:px-0">
                    <ProjectSettingFormResetButton/>
                    <ProjectSettingFormSaveButton />
                </div>
                <ProjectFinish projectId={projectId}/>
            </div>
        </section>
    );
}

export default SettingPage;