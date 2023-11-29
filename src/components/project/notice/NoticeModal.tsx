'use client';
import React, {useEffect, useState} from 'react';
import Modal from "@/components/ui/Modal";
import NoticeItemDetail from "@/components/project/notice/noticeItemDetail/NoticeItemDetail";
import {useRecoilValue, useResetRecoilState} from "recoil";

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


    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => resetCurrentNoticeForm()}
                            title={title}
                            onClickConfirmHandler={currentNoticeForm?.onConfirmHandler}
                        >
                            {currentNoticeForm !== null && <NoticeItemDetail/>}
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


import {
    projectNoticeCurrentFormState,
    projectNoticeModalStateSelector
} from "@/store/project/notice/ProjectNoticeStateStore";
import {createPortal} from "react-dom";

export default NoticeModal;