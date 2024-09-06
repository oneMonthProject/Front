import React, {useEffect} from 'react';
import {ProjectAuthMap} from "@/utils/type";
import ProjectName from "@/components/project/setting/info/ProjectName";
import ProjectSubject from "@/components/project/setting/info/ProjectSubject";
import ProjectDate from "@/components/project/setting/info/ProjectDate";
import ProjectSettingFormResetButton from "@/components/project/setting/info/ProjectSettingFormResetButton";
import ProjectSettingFormSaveButton from "@/components/project/setting/info/ProjectSettingFormSaveButton";
import ProjectFinish from "@/components/project/setting/info/ProjectFinish";
import useProjectSettingInfo from "@/hooks/useProjectSettingInfo";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    projectSettingInfoStateStore
} from "@/store/project/setting/ProjectSettingFormStateStore";
import ProjectTechnologies from "@/components/project/setting/info/ProjectTechnologies";
import {bigIntToString} from "@/utils/common";
import ProjectSettingInfoSkeleton from "@/components/project/setting/info/ProjectSettingInfoSkeleton";

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
        <>
            <div className="max-w-[1100px] space-y-10 px-8 mobile:px-4">
                <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 정보</div>
                <div className="w-full mx-auto grid pc:grid-cols-2 tablet:grid-cols-1 gap-10 place-content-between">
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
                </div>
                <div className="w-full my-4 flex items-center justify-center space-x-2">
                    <ProjectSettingFormResetButton/>
                    <ProjectSettingFormSaveButton initData={data!.data!}/>
                </div>
            </div>
            <div className="mt-12 px-8 mobile:px-4 space-y-10">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 종료</div>
                <div className="w-[380px] tablet:w-full flex flex-col items-start justify-center">
                    <ProjectFinish projectId={bigIntToString(projectId)}/>
                </div>
            </div>
        </>
    );
}

export default ProjectSettingInfo;