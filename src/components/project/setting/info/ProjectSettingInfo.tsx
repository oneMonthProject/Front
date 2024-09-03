import React, {useEffect} from 'react';
import {ProjectAuthMap} from "@/utils/type";
import ProjectName from "@/components/project/setting/ProjectName";
import ProjectSubject from "@/components/project/setting/ProjectSubject";
import ProjectDate from "@/components/project/setting/ProjectDate";
import ProjectSettingFormResetButton from "@/components/project/setting/ProjectSettingFormResetButton";
import ProjectSettingFormSaveButton from "@/components/project/setting/ProjectSettingFormSaveButton";
import ProjectFinish from "@/components/project/setting/ProjectFinish";
import useProjectSettingInfo from "@/hooks/useProjectSettingInfo";
import {useSetRecoilState} from "recoil";
import {projectSettingInfoSelector} from "@/store/project/setting/ProjectSettingFormStateStore";
import ProjectTechnologies from "@/components/project/setting/info/ProjectTechnologies";
import {bigIntToString} from "@/utils/common";

function ProjectSettingInfo({projectId, authMap}: { projectId: bigint, authMap: ProjectAuthMap }) {
    const setProjectSettingProjectId = useSetRecoilState(projectSettingInfoSelector("projectId"));
    const setProjectSettingAuthMap = useSetRecoilState(projectSettingInfoSelector("authMap"));

    const {data, isFetching} = useProjectSettingInfo(projectId);

    // projectId, authMap 상태 초기화
    useEffect(() => {
        setProjectSettingProjectId(projectId);
        setProjectSettingAuthMap(authMap);
    }, [projectId, authMap, setProjectSettingProjectId, setProjectSettingAuthMap]);

    if (isFetching) return <div>loading...</div>;

    const {projectName, projectSubject, startDate, endDate, technologyStacks} = data!.data!;
    return (
        <div className="space-y-6 px-8 mobile:px-4">
            <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 설정</div>
            <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3 px-3 mobile:px-0">
                <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectName initData={projectName}/>
                    <ProjectSubject initData={projectSubject}/>
                </div>
                <ProjectDate initStartDate={startDate} initEndDate={endDate}/>
            </div>
            <ProjectTechnologies initData={technologyStacks}/>
            <div className="mb-6 text-end space-x-2 px-3 mobile:px-0">
                <ProjectSettingFormResetButton/>
                <ProjectSettingFormSaveButton/>
            </div>
            <ProjectFinish projectId={bigIntToString(projectId)}/>
        </div>
    );
}

export default ProjectSettingInfo;