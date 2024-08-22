'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {ProjectMemberProfile} from "@/utils/type";
import {useQueryClient} from "@tanstack/react-query";
import {withdrawProject} from "@/service/project/crews";
import {useRouter} from "next/navigation";

function CrewOutButton({projectMemberInfo}: { projectMemberInfo: ProjectMemberProfile }) {
    const {projectMemberAuth, projectMemberId, projectId} = projectMemberInfo;
    const setSnackBar = useSetRecoilState(snackbarState);
    const router = useRouter();

    const queryClient = useQueryClient();

    const onClickCrewOutHandler = async () => {
        if (confirm("프로젝트를 탈퇴하시겠습니까?")) {
            const res = await withdrawProject(projectId, projectMemberId);
            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['noticeList']});
                setSnackBar({show: true, type: 'SUCCESS', content: '프로젝트를 탈퇴했습니다.'});
                router.replace("/");
            } else {
                setSnackBar({show: true, type: 'ERROR', content: res.message});
            }
        }
    }

    const isManager = projectMemberAuth.projectMemberAuthName === '매니저';

    if (isManager) return null; // TODO: 매니저 탈퇴 구현시, 매니저 권한 양도 로직 추가

    return (
        <Button type='button' theme='black' size='md' onClickHandler={onClickCrewOutHandler}>
            프로젝트 탈퇴
        </Button>
    );
}

export default CrewOutButton;