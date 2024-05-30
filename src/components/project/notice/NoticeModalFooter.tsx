import React from 'react';
import Button from "@/components/ui/Button";
import {ProjectNoticeTypesKey, RecruitPermit, TaskScore} from "@/app/project/@notice/_utils/type";
import {
    confirmCrewForceWithdrawNotice,
    confirmCrewWithdrawNotice,
    confirmRecruitNotice,
    confirmTaskNotice
} from "@/service/project/confirm";
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {
    projectConfirmDataSelector,
    projectNoticeCurrentFormState
} from "@/store/project/notice/ProjectNoticeStateStore";
import {useQueryClient} from "@tanstack/react-query";
import {CrewWithdrawConfirm} from "@/app/project/@notice/_utils/constant";

function NoticeModalFooter({
                               noticeFormType,
                               close
                           }: { noticeFormType: ProjectNoticeTypesKey, close: () => void }) {

    const queryClient = useQueryClient();
    const setSnackbar = useSetRecoilState(snackbarState);
    const resetCurrentNoticeForm = useResetRecoilState(projectNoticeCurrentFormState);
    const {projectId, alertId} = useRecoilValue(projectNoticeCurrentFormState)!;
    const projectConfirmData = useRecoilValue(projectConfirmDataSelector(noticeFormType));


    async function onConfirmHandler() {
        // 업무: 신뢰도 +/-
        if (noticeFormType === 'WORK') {
            const {scoreTypeId} = projectConfirmData! as TaskScore;

            const res = await confirmTaskNotice(alertId, scoreTypeId);

            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['noticeList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 완료한 크루에게 신뢰점수를 부여했습니다.'});
                resetCurrentNoticeForm();
            }
        }

        // 모집 - 거절하거나 수락
        if (noticeFormType === 'RECRUIT') {
            const {isPermit: confirmResult} = projectConfirmData as RecruitPermit;

            if (confirmResult === null) {
                setSnackbar({show: true, type: 'ERROR', content: '프로젝트 합류 여부를 선택해주세요.'});
                return;
            }

            const res = await confirmRecruitNotice(projectId, alertId, confirmResult);

            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['noticeList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '모집 지원 알림을 확인했습니다.'});
                resetCurrentNoticeForm();
            }
        }

        if (noticeFormType == 'ADD') {
            resetCurrentNoticeForm();
        }

        if (noticeFormType === 'WITHDRAWAL') {
            const {withdrawConfirm} = projectConfirmData as CrewWithdrawConfirm;

            if (withdrawConfirm === null) {
                setSnackbar({show: true, type: 'ERROR', content: '탈퇴 여부를 선택해주세요.'});
                return;
            }

            const res = await confirmCrewWithdrawNotice(alertId, withdrawConfirm);

            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['crewList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '탈퇴 처리를 완료했습니다.'});
                resetCurrentNoticeForm();
            }
        }

        if(noticeFormType === 'FORCED_WITHDRAWAL'){
            const {withdrawConfirm} = projectConfirmData as CrewWithdrawConfirm;
            if(withdrawConfirm){
                if(confirm("강제 탈퇴시 해당 크루의 이력에 강제 탈퇴 기록이 남으며, 탈퇴를 취소할 수 없습니다. \r\n 크루를 강제 탈퇴 하시겠습니까? ")){
                    const res = await confirmCrewForceWithdrawNotice(projectId, alertId);
                }
            }

        }
    }

    return (
        <div
            className='h-[3rem] mobile:h-[2rem] mobile:w-[6.8rem] tablet:w-[7.8rem] flex items-center justify-between mx-auto'>
            <Button
                size='md'
                onClickHandler={() => onConfirmHandler()}
            >
                확인
            </Button>
            <Button size='md' theme='cancel' onClickHandler={() => close()}>닫기</Button>
        </div>
    );
}

export default NoticeModalFooter;