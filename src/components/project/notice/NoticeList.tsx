'use client';
import React, {useState} from 'react';
import {Notice, PageResponseBody} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useQueryString} from "@/hooks/useQueryString";
import {getProjectNoticeList} from "@/service/project/notice";
import CommonPagination from "@/components/ui/CommonPagination";


// todo 1 - 시간마다 체크 안된 전체 알림 목록 조회
//  - 페이지네이션: 한 페이지에 10 row
//  - 모집 / 업무 / 크루 / 전체별 api (시간마다 & 요청시 조회)
const ITEM_COUNT = 10;
const PAGE_RANGE = 5;
function NoticeList() {
    const projectId = useQueryString('projectId');
    const [pageIndex, setPageIndex] = useState(0);

    // 5초마다 백그라운드에서 알림 목록 refetch
    const {data} = useSuspenseQuery<PageResponseBody<Notice[]>, Error>({
        queryKey: ['noticeList', projectId],
        queryFn: () => getProjectNoticeList(projectId, pageIndex, ITEM_COUNT),
        refetchInterval: 5000,
        refetchIntervalInBackground: true
    });

    const noticeList = data.data.content;
    const totalCount = data.data.totalPages;
    return (
        <>
            <ul
                role="list"
                className="divide-y divide-gray-100 mobile:max-h-[23rem] mobile:overflow-y-auto"
            >
                {noticeList.map((item) => (
                    <NoticeItem item={item} key={item.alertId}/>
                ))}
            </ul>
            <CommonPagination
                activePage={pageIndex}
                itemsCountPerPage={ITEM_COUNT}
                totalItemsCount={totalCount}
                pageRangeDisplayed={PAGE_RANGE}
                onChangePageHandler={(pageIndex:number) => setPageIndex(pageIndex)}
            />
        </>

    );
}

export default NoticeList;