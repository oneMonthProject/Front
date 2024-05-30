import React from 'react';
import NoticeModalContents from "@/components/project/notice/noticeModalContents/NoticeModalContents";
import NoticeItemRecruitInfo from "@/components/project/notice/noticeModalContents/NoticeItemRecruitInfo";
import RecruitSelector from "@/components/project/notice/noticeModalContents/RecruitSelector";
import {Notice} from "@/app/project/@notice/_utils/type";

function Recruit({noticeForm}:{noticeForm:Notice}) {
    const {sendUserId, content} = noticeForm;

    return (
        <NoticeModalContents content={content}>
            <NoticeItemRecruitInfo applicantId={sendUserId}/>
            <RecruitSelector/>
        </NoticeModalContents>
    );
}

export default Recruit;