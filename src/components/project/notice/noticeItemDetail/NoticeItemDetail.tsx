'use client';
import React from 'react';
import Select from "@/components/ui/Select";
import {useRecoilState} from "recoil";
import {
    projectNoticeCurrentFormState,
    ProjectNoticeRecruitForm,
    ProjectNoticeTaskForm
} from "@/store/projectNotice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import NoticeItemRecruitInfo from "@/components/project/notice/noticeItemDetail/NoticeItemRecruitInfo";


const selectItems: SelectItem[] = [
    {name: '수락', value: 'true'},
    {name: '거절', value: 'false'}
]

function NoticeItemDetail() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeJoinPermitHandler(selectItem: SelectItem) {
        if (currentNoticeForm instanceof ProjectNoticeRecruitForm) {
            const updatedNoticeForm = {...currentNoticeForm, isPermit: selectItem.value};
            setCurrentNoticeForm(updatedNoticeForm);
        }
    }

    function onChangeTaskPointHandler(selectItem: SelectItem) {
        if (currentNoticeForm instanceof ProjectNoticeTaskForm) {
            const updatedNoticeForm = {...currentNoticeForm, isTaskSuccess: selectItem.value};
            setCurrentNoticeForm(updatedNoticeForm);
        }
    }


    return (
        <section className='tablet:w-[450px] max-h-[400px] mb-4 overflow-y-auto flex-col items-center'>
            <section className='tablet:max-w-[400px] mx-auto mt-4 mb-8'>
                <div className='flex flex-col px-8 py-4 rounded-md bg-ground200'>
                    <span className='tablet:text-[1.2rem] mb-3 font-semibold text-grey800'>Message :</span>
                    <span className='tablet:text-[1.4rem] text-grey900 font-semibold text-center'>{currentNoticeForm?.content}</span>
                </div>
            </section>
            {
                currentNoticeForm?.formType === '모집'
                && <NoticeItemRecruitInfo/>
            }

            {
                currentNoticeForm?.formType === '모집'
                && (
                    <section className='max-w-[150px] mx-auto my-7 flex flex-col items-stretch'>
                        <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>프로젝트 합류</label>
                        <Select
                            items={selectItems}
                            label=''
                            setValue={onChangeJoinPermitHandler}
                            value={
                                {
                                    name: (currentNoticeForm as ProjectNoticeRecruitForm).isPermit === 'true'
                                        ? '수락'
                                        : '거절',
                                    value: (currentNoticeForm as ProjectNoticeRecruitForm).isPermit
                                }
                            }/>
                    </section>
                )}
            {
                currentNoticeForm?.formType === '업무'
                && (
                    <section className='max-w-[150px] mx-auto mt-9 flex flex-col items-stretch'>
                        <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold mb-2'>신뢰점수 부여</label>
                        <Select
                            items={selectItems}
                            label=''
                            setValue={onChangeTaskPointHandler}
                            value={
                                {
                                    name: (currentNoticeForm as ProjectNoticeTaskForm).isTaskSuccess === 'true'
                                        ? '+ 신뢰점수'
                                        : '- 신뢰점수',
                                    value: (currentNoticeForm as ProjectNoticeTaskForm).isTaskSuccess
                                }
                            }/>
                    </section>
                )
            }

        </section>
    );
}

export default NoticeItemDetail;