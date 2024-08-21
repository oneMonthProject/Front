import React from 'react';
import NoticeModalContents from "@/components/project/alert/noticeModalContents/NoticeModalContents";
import {Notice} from "@/app/project/@notice/_utils/type";
import WthdrawSelector from "@/components/project/alert/noticeModalContents/WthdrawSelector";

function CrewWithdrawal({noticeForm}:{noticeForm:Notice}) {
    const {content} = noticeForm;

    return (
        <NoticeModalContents content={content}>
            <WthdrawSelector/>
        </NoticeModalContents>
    );
}

export default CrewWithdrawal;