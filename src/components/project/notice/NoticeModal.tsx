'use client';

import React, {useEffect, useState} from 'react';
import Modal from "@/components/ui/Modal";
import NoticeModalContents from "@/components/project/notice/noticeModalContents/NoticeModalContents";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {
    projectNoticeCurrentFormState,
    projectNoticeModalStateSelector,
    ProjectNoticeRecruitForm,
    ProjectNoticeTaskForm
} from "@/store/project/notice/ProjectNoticeStateStore";
import {createPortal} from "react-dom";
import {confirmRecruitNotice, confirmTaskNotice} from "@/service/project/confirm";
import {snackbarState} from "@/store/CommonStateStore";
import {useQueryClient} from "@tanstack/react-query";

function NoticeModal() {
    const [snackbar, setSnackbar] = useRecoilState(snackbarState);
    const {isOpen, title} = useRecoilValue(projectNoticeModalStateSelector);
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    const resetCurrentNoticeForm = useResetRecoilState(projectNoticeCurrentFormState);
    const currentNoticeForm = useRecoilValue(projectNoticeCurrentFormState);

    const queryClient = useQueryClient();

    useEffect(() => {
        setPortalElement(document.getElementById('modal'));

        if (!isOpen) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    async function onConfirmHandler() {
        // 업무 - 신뢰도 부여하거나, 깎거나
        if (currentNoticeForm?.type === 'WORK') {
            const {alertId, scoreTypeId} = currentNoticeForm as ProjectNoticeTaskForm;
            if (scoreTypeId === null) {
                setSnackbar({show: true, type: 'ERROR', content: '신뢰점수를 선택해주세요.'});
                return;
            }
            const res = await confirmTaskNotice(alertId, scoreTypeId);

            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['noticeList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 완료한 크루에게 신뢰점수를 부여했습니다.'});
                resetCurrentNoticeForm();
            }

        }
        // 모집 - 거절하거나 수락
        if (currentNoticeForm?.type === 'RECRUIT') {
            const {projectId, alertId, isPermit: confirmResult} = currentNoticeForm as ProjectNoticeRecruitForm;
            if (confirmResult === '') {
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

        if (currentNoticeForm?.type == 'ADD') {
            resetCurrentNoticeForm();
        }
    }

    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => resetCurrentNoticeForm()}
                            title={title}
                            onClickConfirmHandler={onConfirmHandler}
                        >
                            {currentNoticeForm !== null && <NoticeModalContents/>}
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


export default NoticeModal;