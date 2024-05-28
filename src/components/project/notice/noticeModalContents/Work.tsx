import React from 'react';
import {Notice} from "@/app/project/@notice/_utils/type";
import NoticeModalContents from "@/components/project/notice/noticeModalContents/NoticeModalContents";
import TaskPointSelector from "@/components/project/notice/noticeModalContents/TaskPointSelector";

function Work({noticeForm}:{noticeForm:Notice}) {
    const {content} = noticeForm;
    return (
        <NoticeModalContents content={content}>
            <TaskPointSelector isTaskExpired={content.includes("만료")}/>
        </NoticeModalContents>
    );
}

export default Work;