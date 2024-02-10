'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {createProjectCrewOutNotice} from "@/service/project/notice";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {ProjectMemberProfile} from "@/utils/type";
import {expelCrew} from "@/service/project/crews";
import {getCookie} from "cookies-next";
import {useQueryClient} from "@tanstack/react-query";

function CrewOutButton({projectMemberInfo}: { projectMemberInfo: ProjectMemberProfile }) {
    const {user, projectMemberAuth, projectMemberId} = projectMemberInfo;
    const setSnackBar = useSetRecoilState(snackbarState);

    const queryClient = useQueryClient();

    const onClickCrewOutHandler = async () => {
        if (confirm("프로젝트 탈퇴 신청을 하시겠습니까?")) {
            const res = await createProjectCrewOutNotice(projectMemberId);
            if (res.result === 'success') {
                setSnackBar({show: true, type: 'SUCCESS', content: '프로젝트 탈퇴 신청 알림이 발송되었습니다.'});
            } else {
                setSnackBar({show: true, type: 'ERROR', content: '프로세스 진행중 에러가 발생했습니다.'});
            }
        }
    }

    const onClickCrewForceOutHandler = async () => {
        if (confirm("멤버를 강제 탈퇴 하시겠습니까? \r\n 멤버를 강제 탈퇴할 경우 멤버의 이력에 남으며, 탈퇴를 취소할 수 없습니다.")) {
            const res = await expelCrew(projectMemberId);
            if (res.result === 'success') {
                setSnackBar({show: true, type: 'SUCCESS', content: '멤버 강제 탈퇴를 완료했습니다.'});
                queryClient.invalidateQueries({queryKey:['crewList']});
            } else {
                setSnackBar({show: true, type: 'ERROR', content: '프로세스 진행중 에러가 발생했습니다.'});
            }
        }
    }

    const isMemberCurrentUser = getCookie('user_id') === user.userId.toString();
    const isManager = projectMemberAuth.projectMemberAuthName === '매니저';

    return (
        (isManager || isMemberCurrentUser) &&
        isMemberCurrentUser
            ? (
                <Button type='button' theme='black' size='md' onClickHandler={onClickCrewOutHandler}>
                    프로젝트 탈퇴
                </Button>)
            : (
                <Button type='button' theme='danger' size='md' onClickHandler={onClickCrewForceOutHandler}>
                    프로젝트 강제 탈퇴
                </Button>)
    );
}

export default CrewOutButton;