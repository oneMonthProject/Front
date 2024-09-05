import React, {useEffect} from 'react';
import {ProjectAuthMap} from "@/utils/type";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {
    projectSettingBoardInfoSelector,
    projectSettingBoardInfoStateStore
} from "@/store/project/setting/ProjectSettingFormStateStore";
import useProjectSettingBoardInfo from "@/hooks/useProjectSettingBoardInfo";
import Title from "@/components/project/setting/board/Title";
import BoardPositions from "@/components/project/setting/board/BoardPositions";
import Contact from "@/components/project/setting/board/Contact";
import Content from "@/components/project/setting/board/Content";
import ProjectSettingBoardInfoResetBtn from "@/components/project/setting/board/ProjectSettingBoardInfoResetBtn";
import ProjectSettingBoardInfoSaveBtn from "@/components/project/setting/board/ProjectSettingBoardInfoSaveBtn";
import RecruitmentStatus from "@/components/project/setting/board/RecruitmentStatus";

function ProjectSettingBoardInfo({projectId, authMap}: { projectId: bigint, authMap: ProjectAuthMap }) {
    const setProjectSettingBoardInfoProjectId = useSetRecoilState(projectSettingBoardInfoSelector("projectId"));
    const setProjectSettingBoardInfoAuthMap = useSetRecoilState(projectSettingBoardInfoSelector("authMap"));
    const resetProjectSettingBoardInfo = useResetRecoilState(projectSettingBoardInfoStateStore);

    const {data, isFetching} = useProjectSettingBoardInfo(projectId);

    useEffect(() => {
        // 마운트시 projectId, authMap 상태 초기화
        setProjectSettingBoardInfoProjectId(projectId);
        setProjectSettingBoardInfoAuthMap(authMap);

        // 언마운트시 프로젝트 게시글정보 store reset
        return () => resetProjectSettingBoardInfo();
    }, [
        projectId,
        authMap,
        setProjectSettingBoardInfoProjectId,
        setProjectSettingBoardInfoAuthMap,
        resetProjectSettingBoardInfo
    ]);

    if (isFetching) return <div>loading...</div>;

    const {title, boardPositions, contact, recruitmentStatus, content} = data!.data!;

    return (
        <div className="max-w-[1100px] space-y-10 px-8 mobile:px-4">
            <div className="mt-6 font-semibold text-xl mobile:text-lg py-2 border-b-2">모집 게시글</div>
            <div className="w-full mx-auto grid pc:grid-cols-2 tablet:grid-cols-1 gap-10 place-content-between">
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <RecruitmentStatus initData={recruitmentStatus}/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <Title initData={title}/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <BoardPositions initData={boardPositions.map(v => v.position.positionId)}/>
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <Contact initData={contact}/>
                </div>
                <div className="w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto col-span-2">
                    <Content initData={content}/>
                </div>
            </div>
            <div className="w-full my-4 flex items-center justify-center space-x-2">
                <ProjectSettingBoardInfoResetBtn/>
                <ProjectSettingBoardInfoSaveBtn initData={data!.data!}/>
            </div>
        </div>
    );
}

export default ProjectSettingBoardInfo;