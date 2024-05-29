'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {createProjectCrewForceOutNotice, createProjectCrewOutNotice} from "@/service/project/notice";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {ProjectMemberProfile} from "@/utils/type";
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
                await queryClient.invalidateQueries({queryKey:['noticeList']});
                setSnackBar({show: true, type: 'SUCCESS', content: '프로젝트 탈퇴 신청 알림이 발송되었습니다.'});
            } else {
                setSnackBar({show: true, type: 'ERROR', content: res.message});
            }
        }
    }

    const onClickCrewForceOutHandler = async () => {
        if (confirm("크루 강제탈퇴를 신청하시겠습니까?")) {
            const res = await createProjectCrewForceOutNotice(projectMemberId);
            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey:['noticeList']});
                setSnackBar({show: true, type: 'SUCCESS', content: '크루 강제 탈퇴 신청을 완료했습니다.'});
            } else {
                setSnackBar({show: true, type: 'ERROR', content: res.message});
            }
        }
    }

    const isMemberCurrentUser = getCookie('user_id') === user.userId.toString();
    const isManager = projectMemberAuth.projectMemberAuthName === '매니저';

    if(isManager) return null; // TODO: 매니저 탈퇴 구현시, 매니저 권한 양도 로직 추가

    return (
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