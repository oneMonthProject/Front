'use client';

import React from 'react';
import NoticeModal from "@/components/project/alert/NoticeModal";
import {useRecoilValue} from "recoil";
import {projectNoticeActiveMenuStateStore} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import TaskAlertList from "@/components/project/alert/task/list/TaskAlertList";
import VAlertRecruitList from "@/components/project/alert/vote/recruit/list/VAlertRecruitList";
import VAlertFWList from "@/components/project/alert/vote/fwithdraw/list/VAlertFWList";
import VAlertFwModal from "@/components/project/alert/vote/fwithdraw/modal/VAlertFWModal";
import VAlertRecruitModal from "@/components/project/alert/vote/recruit/modal/VAlertRecruitModal";


function NoticePage() {
    const activeNoticeMenu = useRecoilValue(projectNoticeActiveMenuStateStore);

    return (
        <section className='mb-20 tablet:basis-4/5'>
            {activeNoticeMenu.name === "업무" && <TaskAlertList/>}
            {activeNoticeMenu.name === "모집" && <VAlertRecruitList/>}
            {activeNoticeMenu.name === "강제탈퇴" && <VAlertFWList/>}
            <NoticeModal/>
            <VAlertFwModal/>
            <VAlertRecruitModal/>
        </section>
    );
}

export default NoticePage;