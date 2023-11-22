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
        <section className='flex-col items-center'>
            {
                currentNoticeForm instanceof ProjectNoticeRecruitForm
                && <NoticeItemRecruitInfo/>
            }
            <section>
                <p>{currentNoticeForm?.content}</p>
            </section>
            {
                currentNoticeForm instanceof ProjectNoticeRecruitForm
                && (
                    <section>
                        <Select
                            items={selectItems}
                            label='찐개발자님의 프로젝트 합류'
                            setValue={onChangeJoinPermitHandler}
                            value={
                                {
                                    name: currentNoticeForm.isPermit === 'true'
                                        ? '수락'
                                        : '거절',
                                    value: currentNoticeForm.isPermit
                                }
                            }/>
                    </section>
                )}
            {
                currentNoticeForm instanceof ProjectNoticeTaskForm
                && (
                    <section>
                        <Select
                            items={selectItems}
                            label='신뢰점수 부여'
                            setValue={onChangeTaskPointHandler}
                            value={
                                {
                                    name: currentNoticeForm.isTaskSuccess === 'true'
                                        ? '+ 신뢰점수 부여'
                                        : '- 신뢰점수 부여',
                                    value: currentNoticeForm.isTaskSuccess
                                }
                            }/>
                    </section>
                )
            }

        </section>
    );
}

export default NoticeItemDetail;