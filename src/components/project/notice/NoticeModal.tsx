'use client';
import React, {useEffect, useState} from 'react';
import Modal from "@/components/ui/Modal";
import NoticeModalContents from "@/components/project/notice/noticeModalContents/NoticeModalContents";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
    projectNoticeCurrentFormState,
    projectNoticeModalStateSelector
} from "@/store/project/notice/ProjectNoticeStateStore";
import {createPortal} from "react-dom";

function NoticeModal() {
    const {isOpen, title} = useRecoilValue(projectNoticeModalStateSelector);
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    const resetCurrentNoticeForm = useResetRecoilState(projectNoticeCurrentFormState);
    const currentNoticeForm = useRecoilValue(projectNoticeCurrentFormState);

    useEffect(() => {
        setPortalElement(document.getElementById('modal'));

        if(!isOpen){
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    function onConfirmHandler(){
        // 업무 - 신뢰도 부여하거나, 깎거나
        // 모집 - 거절하거나 수락
    // 크루 - 단순 확인 : checkYN만 바꿈
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