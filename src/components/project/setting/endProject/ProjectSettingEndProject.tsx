import React from 'react';
import ProjectFinish from "@/components/project/setting/info/ProjectFinish";
import {bigIntToString} from "@/utils/common";
import SettingContainer from "@/components/project/setting/SettingContainer";
import SettingTitle from "@/components/project/setting/SettingTitle";

function ProjectSettingEndProject({projectId}:{projectId:bigint}) {
    return (
        <SettingContainer>
            <SettingTitle>프로젝트 종료</SettingTitle>
            <div className="w-[380px] tablet:w-full flex flex-col items-start justify-center">
                <ProjectFinish projectId={bigIntToString(projectId)}/>
            </div>
        </SettingContainer>
    );
}

export default ProjectSettingEndProject;