import React, {useEffect} from 'react';
import {ProjectAuthMap} from "@/utils/type";
import ProjectName from "@/components/project/setting/info/ProjectName";
import ProjectSubject from "@/components/project/setting/info/ProjectSubject";
import ProjectDate from "@/components/project/setting/info/ProjectDate";
import ProjectSettingFormResetButton from "@/components/project/setting/info/ProjectSettingFormResetButton";
import ProjectSettingFormSaveButton from "@/components/project/setting/info/ProjectSettingFormSaveButton";
import useProjectSettingInfo from "@/hooks/useProjectSettingInfo";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    projectSettingInfoStateStore
} from "@/store/project/setting/ProjectSettingFormStateStore";
import ProjectTechnologies from "@/components/project/setting/info/ProjectTechnologies";
import ProjectSettingInfoSkeleton from "@/components/project/setting/info/ProjectSettingInfoSkeleton";
import SettingContainer from "@/components/project/setting/SettingContainer";
import SettingTitle from "@/components/project/setting/SettingTitle";
import SettingBody from "@/components/project/setting/SettingBody";

function ProjectSettingInfo({projectId, authMap}: { projectId: bigint, authMap: ProjectAuthMap }) {
    const setProjectSettingProjectId = useSetRecoilState(projectSettingInfoSelector("projectId"));
    const setProjectSettingAuthMap = useSetRecoilState(projectSettingInfoSelector("authMap"));
    const resetProjectSettingInfoState = useResetRecoilState(projectSettingInfoStateStore);

    const {data, isFetching} = useProjectSettingInfo(projectId);

    useEffect(() => {
        // 마운트시 projectId, authMap 상태 초기화
        setProjectSettingProjectId(projectId);
        setProjectSettingAuthMap(authMap);

        // 언마운트시 프로젝트정보 store 초기화
        return () => resetProjectSettingInfoState();
    }, [projectId, authMap, setProjectSettingProjectId, setProjectSettingAuthMap, resetProjectSettingInfoState]);

    if (isFetching) return <ProjectSettingInfoSkeleton/>;

    const {projectName, projectSubject, startDate, endDate, technologyStacks} = data!.data!;
    return (
        <SettingContainer>
            <SettingTitle>프로젝트 정보</SettingTitle>
            <SettingBody>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectName initData={projectName}/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectSubject initData={projectSubject}/>
                </div>
                <div className='row-span-2'>
                    <ProjectDate initStartDate={startDate} initEndDate={endDate}/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <ProjectTechnologies initData={technologyStacks}/>
                </div>
            </SettingBody>
            <div className="w-full my-4 flex items-center justify-center space-x-2">
                <ProjectSettingFormResetButton/>
                <ProjectSettingFormSaveButton initData={data!.data!}/>
            </div>
        </SettingContainer>
    );
}

export default ProjectSettingInfo;