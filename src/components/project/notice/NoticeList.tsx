'use client';
import React, {useState} from 'react';
import {Notice, PageResponseBody} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useQueryString} from "@/hooks/useQueryString";
import {getProjectNoticeList} from "@/service/project/notice";
import CommonPagination from "@/components/ui/CommonPagination";
import {useRecoilValue} from "recoil";
import {currentProjectNoticeNavTabSelector} from "@/store/project/notice/ProjectNoticeNavTabStateStore";


const ITEM_COUNT = 5;
const PAGE_RANGE = 5;

function NoticeList() {
    const projectId = useQueryString('projectId');
    const [pageIndex, setPageIndex] = useState(0);
    const currentNoticeNavTab = useRecoilValue(currentProjectNoticeNavTabSelector);

    // 5초마다 백그라운드에서 알림 목록 refetch
    const {data} = useSuspenseQuery<PageResponseBody<Notice[]>, Error>({
        queryKey: ['noticeList', projectId],
        queryFn: () => getProjectNoticeList(projectId, pageIndex, ITEM_COUNT),
        refetchInterval: 5000
    });


    const noticeList = data.data.content;
    const filteredList = currentNoticeNavTab.type === 'ALL'
        ? noticeList
        : noticeList.filter(v => v.type === currentNoticeNavTab.type);

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
                activePage={pageIndex + 1}
                itemsCountPerPage={ITEM_COUNT}
                totalItemsCount={totalCount}
                pageRangeDisplayed={PAGE_RANGE}
                onChangePageHandler={(pageIndex:number) => setPageIndex(pageIndex - 1)}
            />
        </>

    );
}

export default NoticeList;