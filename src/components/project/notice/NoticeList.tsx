'use client';
import React from 'react';
import NoticeBadge from "@/components/ui/NoticeBadge";
import {NoticeItem} from "@/utils/type";

class TestItems implements NoticeItem {
    alertId: string;
    content: string;
    createDate: string;
    type: string;

    constructor(alertId: string, content: string, createDate: string, type: string) {
        this.alertId = alertId;
        this.content = content;
        this.createDate = createDate;
        this.type = type;
    }
}

const testItems = [
    new TestItems('1', '찐개발자 님이 프론트엔드 포지션에 지원했습니다.', '2023-01-12', '모집'),
    new TestItems('2', '찐개발자 님이 프론트엔드 포지션에 지원했습니다.', '2023-01-12', '모집'),
    new TestItems('3', '찐개발자 님이 프론트엔드 포지션에 지원했습니다.', '2023-01-12', '모집'),
    new TestItems('4', '찐개발자 님이 db스키마 설계 업무를 완료했습니다.', '2023-01-12', '업무'),
    new TestItems('5', '찐개발자 님이 db스키마 설계 업무 기한이 만료되었습니다.', '2023-01-12', '업무'),
    new TestItems('6', '찐개발자 님이 db스키마 설계 업무 기한이 만료되었습니다.', '2023-01-12', '업무'),
    new TestItems('7', '찐개발자 님이 프로젝트에 합류했습니다.', '2023-01-12', '크루'),
    new TestItems('8', '찐개발자 님이 프로젝트를 탈퇴했습니다', '2023-01-12', '크루'),
    new TestItems('9', '찐개발자 님이 프로젝트를 탈퇴했습니다', '2023-01-12', '크루'),
    new TestItems('10', '찐개발자 님이 프로젝트를 탈퇴했습니다', '2023-01-12', '크루')
]


// todo - 시간마다 체크 안된 알림 목록(type, alertId, content, createDate) 조회하는 fetch api 추가 (라우트 핸들러 -> 라우트 핸들러에서 fetch)
// todo - 페이지네이션: 한 페이지에 1 row
// todo - 모집 / 업무 / 크루 / 전체별 api 필요

function NoticeList() {
    return (
        <ul role="list" className="divide-y divide-gray-100 mobile:max-h-[23rem] mobile:overflow-y-auto">
            {testItems.map((item) => (
                <li key={item.alertId} className="flex items-center gap-x-10 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer">
                    <div className='flex items-center gap-x-4'>
                        <NoticeBadge size='sm' text={item.type}/>
                        {item.content}
                    </div>
                    <div className='ml-auto text-grey600'>
                        {item.createDate}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default NoticeList;