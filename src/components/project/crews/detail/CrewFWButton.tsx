import React from 'react';
import Button from "@/components/ui/Button";
import {useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState} from "recoil";
import {CrewFWModalState, crewFWModalStateStore} from "@/store/project/crewFWModal/CrewFWModalStateStore";
import {ProjectMember, ProjectMemberProfile} from "@/utils/type";
import {VAlertFWCreateData} from "@/service/project/alert/type";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";

function CrewFwButton({projectMemberInfo}: { projectMemberInfo: ProjectMemberProfile }) {
    const [createFWModalState, setCreateFWModalState] = useRecoilState(crewFWModalStateStore);
    const {projectMemberId, projectId} = projectMemberInfo;
    const {state, contents} = useRecoilValueLoadable(projectTaskAuthSelector(null));

    const onClickCrewFWButtonHandler = () => {
        const updateModalState:CrewFWModalState = {
            title: createFWModalState.title,
            isOpen: true,
            createData :{
                project_id: projectId,
                fw_member_id: projectMemberId,
                authMap: contents.data,
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