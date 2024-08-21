import React from 'react';
import NoticeModalContents from "@/components/project/alert/noticeModalContents/NoticeModalContents";
import NoticeItemRecruitInfo from "@/components/project/alert/noticeModalContents/NoticeItemRecruitInfo";
import RecruitSelector from "@/components/project/alert/noticeModalContents/RecruitSelector";
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