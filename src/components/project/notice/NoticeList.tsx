'use client';
import React from 'react';
import {Notice, PageResponseBody} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useQueryString} from "@/hooks/useQueryString";
import {getProjectNoticeList} from "@/service/project/notice";


// todo 1 - 시간마다 체크 안된 전체 알림 목록 조회
//  - 특정시간마다 현재 navTab에 매칭되는, 체크 안된 알림목록 조회하는 fetch api 추가 (라우트 핸들러 -> 라우트 핸들러에서 fetch)
//  - 페이지네이션: 한 페이지에 10 row
//  - 모집 / 업무 / 크루 / 전체별 api (시간마다 & 요청시 조회)

function NoticeList() {
    const projectId = useQueryString('projectId');
    const {data} = useSuspenseQuery<PageResponseBody<Notice[]>,Error>({
       queryKey:['noticeList',projectId],
       queryFn: () => getProjectNoticeList(projectId)
    });

    const noticeList = data.data.content;
    return (
        <ul
            role="list"
            className="divide-y divide-gray-100 mobile:max-h-[23rem] mobile:overflow-y-auto"
        >
            {noticeList.map((item) => (
                <NoticeItem item={item} key={item.alertId}/>
            ))}
        </ul>
    );
}

export default NoticeList;