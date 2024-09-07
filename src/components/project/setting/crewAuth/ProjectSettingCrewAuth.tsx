import React from 'react';
import SettingContainer from "@/components/project/setting/SettingContainer";
import SettingTitle from "@/components/project/setting/SettingTitle";
import useProjectCrewList from "@/hooks/useProjectCrewList";
import ProjectSettingCrewAuthSkeleton from "@/components/project/setting/crewAuth/ProjectSettingCrewAuthSkeleton";
import CrewAuthRow from "@/components/project/setting/crewAuth/CrewAuthRow";
import {useRecoilValueLoadable} from "recoil";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";

function ProjectSettingCrewAuth({projectId}: { projectId: string }) {
    const {crewList, isFetching} = useProjectCrewList(projectId);

    const {
        state: authState,
        contents: authContents
    } = useRecoilValueLoadable<ResponseBody<ProjectAuthMap | null>>(projectTaskAuthSelector(null));

    if (isFetching || authState === 'loading') return <ProjectSettingCrewAuthSkeleton/>;

    return (
        <SettingContainer>
            <SettingTitle>크루 권한</SettingTitle>
            <div className="mx-auto mt-8 flow-root">
                <div className="-ml-4 -my-2 sm:-ml-6 lg:-ml-12">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {crewList.map((crew) => (
                                <CrewAuthRow
                                    key={crew.projectMemberId}
                                    crew={crew}
                                    projectId={projectId}
                                    authMap={authContents.data}/>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SettingContainer>
    );
}

export default ProjectSettingCrewAuth;