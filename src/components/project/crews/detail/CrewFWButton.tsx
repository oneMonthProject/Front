import React, {useEffect} from 'react';
import Button from "@/components/ui/Button";
import {useRecoilState, useRecoilValueLoadable} from "recoil";
import {CrewFWModalState, crewFWModalStateStore} from "@/store/project/alert/modal/CrewFWModalStateStore";
import {ProjectAuthMap, ProjectMemberProfile} from "@/utils/type";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import {getMyProjectDetail} from "@/service/project/project";
import useProjectInfo from "@/hooks/useProjectInfo";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";

function CrewFwButton({projectMemberInfo}: { projectMemberInfo: ProjectMemberProfile }) {
    const {projectInfo, isFetching} = useProjectInfo(projectMemberInfo.projectId, projectMemberInfo.user.userId);
    const [createFWModalState, setCreateFWModalState] = useRecoilState(crewFWModalStateStore);
    const {projectMemberId, projectId, projectMemberAuth} = projectMemberInfo;

    if (isFetching) return <ButtonStyleSkeleton size='md' className='w-[80px] h-[30px] my-3 '/>;
    const {authMap} = projectInfo;

    const onClickCrewFWButtonHandler = () => {
        const updateModalState: CrewFWModalState = {
            title: createFWModalState.title,
            isOpen: true,
            createData: {
                project_id: projectId,
                fw_member_id: projectMemberId,
                fw_member_auth: projectMemberAuth,
                authMap,
                reason: createFWModalState.createData.reason
            }
        }
        setCreateFWModalState(updateModalState);
    }

    return (
        <Button type='button' theme='danger' size='md' onClickHandler={onClickCrewFWButtonHandler}>
            강제탈퇴 투표
        </Button>
    );
}

export default CrewFwButton;