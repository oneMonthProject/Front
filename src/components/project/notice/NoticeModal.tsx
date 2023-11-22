import React from 'react';
import Modal from "@/components/ui/Modal";
import NoticeItemDetail from "@/components/project/notice/noticeItemDetail/NoticeItemDetail";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
    projectNoticeCurrentFormState,
    projectNoticeModalStateSelector
} from "@/store/projectNotice/ProjectNoticeStateStore";


function NoticeModal() {
    const {isOpen, title} = useRecoilValue(projectNoticeModalStateSelector);
    const resetCurrentNoticeForm = useResetRecoilState(projectNoticeCurrentFormState);
    const currentNoticeForm = useRecoilValue(projectNoticeCurrentFormState);

    return (
        <Modal
            isOpen={isOpen}
            close={() => resetCurrentNoticeForm()}
            title={title}
            onClickConfirmHandler={currentNoticeForm?.onConfirmHandler}
        >
            {currentNoticeForm !== null && <NoticeItemDetail />}
        </Modal>
    );
}

export default NoticeModal;