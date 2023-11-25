'use client';
import React from 'react';
import {NoticeItemProp} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";

class TestItems implements NoticeItemProp {
    alertId: string;
    createUserId: string;
    content: string;
    createDate: string;
    type: string;

    constructor(createUserId:string, alertId: string, content: string, createDate: string, type: string) {
        this.alertId = alertId;
        this.createUserId = createUserId;
        this.content = content;
        this.createDate = createDate;
        this.type = type;
    }


}

const testItems = [
    new TestItems('user1','1', '찐개발자 님이 프론트엔드 포지션에 지원했습니다.', '2023-01-12', '모집'),
    new TestItems('user1','2', '찐개발자 님이 프론트엔드 포지션에 지원했습니다.', '2023-01-12', '모집'),
    new TestItems('user1','3', '찐개발자 님이 프론트엔드 포지션에 지원했습니다.', '2023-01-12', '모집'),
    new TestItems('user1','4', '찐개발자 님이 db스키마 설계 업무를 완료했습니다.', '2023-01-12', '업무'),
    new TestItems('user1','5', '찐개발자 님이 db스키마 설계 업무 기한이 만료되었습니다.', '2023-01-12', '업무'),
    new TestItems('user1','6', '찐개발자 님이 db스키마 설계 업무 기한이 만료되었습니다.', '2023-01-12', '업무'),
    new TestItems('user1','7', '찐개발자 님이 프로젝트에 합류했습니다.', '2023-01-12', '크루'),
    new TestItems('user1','8', '찐개발자 님이 프로젝트를 탈퇴했습니다', '2023-01-12', '크루'),
    new TestItems('user1','9', '찐개발자 님이 프로젝트를 탈퇴했습니다', '2023-01-12', '크루'),
    new TestItems('user1','10', '찐개발자 님이 프로젝트를 탈퇴했습니다', '2023-01-12', '크루')
]


// todo 1 - 시간마다 체크 안된 전체 알림 목록 조회
//  - 특정시간마다 현재 navTab에 매칭되는, 체크 안된 알림목록 조회하는 fetch api 추가 (라우트 핸들러 -> 라우트 핸들러에서 fetch)
//  - 페이지네이션: 한 페이지에 10 row
//  - 모집 / 업무 / 크루 / 전체별 api (시간마다 & 요청시 조회)


function NoticeList() {
    return (
        <ul
            role="list"
            className="divide-y divide-gray-100 mobile:max-h-[23rem] mobile:overflow-y-auto"
        >
            {testItems.map((item) => (
                <NoticeItem item={item} key={item.alertId}/>
            ))}
        </ul>
    );
}

export default NoticeList;