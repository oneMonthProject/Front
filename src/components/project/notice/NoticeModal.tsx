'use client';

import React, {useEffect, useState} from 'react';
import Modal from "@/components/ui/Modal";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
    projectNoticeCurrentFormState,
    projectNoticeModalStateSelector
} from "@/store/project/notice/ProjectNoticeStateStore";
import {createPortal} from "react-dom";
import Recruit from "@/components/project/notice/noticeModalContents/Recruit";
import CrewWithdrawal from "@/components/project/notice/noticeModalContents/CrewWithdrawal";
import Work from "@/components/project/notice/noticeModalContents/Work";
import NoticeModalFooter from "@/components/project/notice/NoticeModalFooter";

function NoticeModal() {
    const {isOpen, title} = useRecoilValue(projectNoticeModalStateSelector);
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    const resetCurrentNoticeForm = useResetRecoilState(projectNoticeCurrentFormState);
    const currentNoticeForm = useRecoilValue(projectNoticeCurrentFormState);


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



    if(!(isOpen && portalElement) || currentNoticeForm == null) return null;

    let modalContents = null;
    switch(currentNoticeForm.type){
        case 'WORK':
            modalContents = <Work noticeForm={currentNoticeForm}/>;
            break;
        case 'RECRUIT':
            modalContents = <Recruit noticeForm={currentNoticeForm}/>
            break;
        case 'FORCEWITHDRAWAL':
        case 'WITHDRAWAL':
            modalContents = <CrewWithdrawal noticeForm={currentNoticeForm}/>;
            break;
        default:
            modalContents = null;
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
                            footer={<NoticeModalFooter noticeFormType={currentNoticeForm.type} />}
                        >
                            {modalContents}
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


export default NoticeModal;