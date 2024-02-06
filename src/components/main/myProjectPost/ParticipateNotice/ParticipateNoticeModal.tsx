'use client';

import React, {useEffect, useState} from 'react';
import {useRecoilState, useResetRecoilState} from "recoil";
import {userNoticeListStateStore, userNoticeModalStateStore} from "@/store/UserNoticeModalStateStore";
import {createPortal} from "react-dom";
import Modal from "@/components/ui/Modal";
import ParticipateNoticeModalContents from "@/components/main/myProjectPost/ParticipateNotice/ParticipateNoticeModalContents";

function ParticipateNoticeModal() {
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    const resetNoticeList = useResetRecoilState(userNoticeListStateStore);
    const [{isOpen}, setIsOpen] = useRecoilState(userNoticeModalStateStore);

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

    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => {
                                setIsOpen({isOpen:false});
                                resetNoticeList();
                            }}
                            title='프로젝트 지원 현황'
                            onClickConfirmHandler={() => {
                                setIsOpen({isOpen:false});
                                resetNoticeList();
                            }}
                        >
                            <ParticipateNoticeModalContents/>
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>
    );
}

export default ParticipateNoticeModal;