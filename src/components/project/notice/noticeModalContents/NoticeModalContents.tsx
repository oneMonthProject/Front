'use client';
import React from 'react';
import {useRecoilValue} from "recoil";
import {projectNoticeCurrentFormState} from "@/store/project/notice/ProjectNoticeStateStore";
import NoticeItemRecruitInfo from "@/components/project/notice/noticeModalContents/NoticeItemRecruitInfo";
import TaskPointSelector from "@/components/project/notice/noticeModalContents/TaskPointSelector";
import RecruitSelector from "@/components/project/notice/noticeModalContents/RecruitSelector";
import WthdrawSelector from "@/components/project/notice/noticeModalContents/WthdrawSelector";
import {PROJECT_NOTICE_TYPE as PNT} from "@/app/project/@notice/_utils/constant";

function NoticeModalContents() {
    const currentNoticeForm = useRecoilValue(projectNoticeCurrentFormState);
    if (!currentNoticeForm) return null;

    const {name: formName, form} = currentNoticeForm;

    return (
        <section className='tablet:w-[450px] min-h-[400px] mb-4 overflow-y-auto flex-col items-center'>
            <section className='tablet:max-w-[400px] mx-auto mt-4 mb-8'>
                <div className='flex flex-col px-8 py-4 rounded-md bg-ground200'>
                    <span className='tablet:text-[1.2rem] mb-3 font-semibold text-grey800'>Message :</span>
                    <span
                        className='tablet:text-[1.4rem] text-grey900 font-semibold text-center'>{form.content}</span>
                </div>
            </section>
            {
                formName === PNT.RECRUIT.value && <NoticeItemRecruitInfo/>
            }
            {
                formName === PNT.FORCEWITHDRAWL.value && <WthdrawSelector/>
            }
            {
                formName === PNT.RECRUIT.value && <RecruitSelector/>
            }
            {
                formName === PNT.WORK.value && <TaskPointSelector/>
            }

        </section>
    );
}

export default NoticeModalContents;