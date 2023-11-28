import React from 'react';
import {NoticeItemProp} from "@/utils/type";
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {useRecoilState} from "recoil";
import {
    ProjectNoticeCrewForm,
    projectNoticeCurrentFormState, ProjectNoticeRecruitForm,
    ProjectNoticeTaskForm
} from "@/store/projectNotice/ProjectNoticeStateStore";

// todo - 아이템 클릭시 아이템 타입에 해당하는 모달창 open
//  1. type에 따른 title 정해서 모달창 먼저 show
//  2. type이 모집이면
//  - createUser정보 조회해서 profile 생성
//  - content 표시
//  - 수락/거절 select
//  - 확인 클릭 콜백 추가
//  3. type이 업무이면
//  - +,-신뢰점수부여 select
//  - content 표시
//  - 확인 클릭 콜백
//  4. type이 크루면
//  - content 표시

function NoticeItem({item: {alertId, createUserId, type, content, createDate, position}}: { item: NoticeItemProp }) {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onClickHandler(type: string) {
        switch (type) {
            case '업무':
                setCurrentNoticeForm(new ProjectNoticeTaskForm(type, alertId, createUserId, content));
                break;
            case '모집':
                setCurrentNoticeForm(new ProjectNoticeRecruitForm(type, alertId, createUserId, position!, content));
                break;
            case '크루':
                setCurrentNoticeForm(new ProjectNoticeCrewForm(type, alertId, createUserId, content));
                break;
            default:
                throw Error('Unknown Project Notice Type');
        }
    }

    return (
        <li
            key={alertId}
            className="flex items-center gap-x-10 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer"
            onClick={() => onClickHandler(type)}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge size='sm' text={type}/>
                {content}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;