import React from 'react';
import NoticeModalContents from "@/components/project/notice/noticeModalContents/NoticeModalContents";
import {Notice} from "@/app/project/@notice/_utils/type";
import WthdrawSelector from "@/components/project/notice/noticeModalContents/WthdrawSelector";

function ForceWIthdrawl({noticeForm}:{noticeForm:Notice}) {
    const {content} = noticeForm;

    return (
        <NoticeModalContents content={content}>
            <WthdrawSelector/>
        </NoticeModalContents>
    );
}

export default ForceWIthdrawl;