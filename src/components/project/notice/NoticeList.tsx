'use client';
import React, {useState} from 'react';
import {Notice, PageResponseBody} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useQueryString} from "@/hooks/useQueryString";
import {getProjectNoticeByType} from "@/service/project/notice";
import CommonPagination from "@/components/ui/CommonPagination";
import {useRecoilValue} from "recoil";
import {currentProjectNoticeNavTabSelector} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import Loader from "@/components/ui/Loader";


const ITEM_COUNT = 5;
const PAGE_RANGE = 5;

function NoticeList() {
    const projectId = useQueryString('projectId');
    const [pageIndex, setPageIndex] = useState(0);
    const currentNoticeNavTab = useRecoilValue(currentProjectNoticeNavTabSelector);

    // 5초마다 백그라운드에서 알림 목록 refetch
    const {data, isFetching} = useSuspenseQuery<PageResponseBody<Notice[]>, Error>({
        queryKey: ['noticeList', projectId, pageIndex, ITEM_COUNT, currentNoticeNavTab.type],
        queryFn: () => getProjectNoticeByType(projectId, pageIndex, ITEM_COUNT, currentNoticeNavTab.type),
        refetchInterval: 60000,
        refetchIntervalInBackground: true
    });

    const noticeList = data.data.content;
    const totalCount = data.data.totalPages;

    return (
        <>
            <div className='tablet:h-[300px]'>
                {
                    isFetching
                        ?
                        (
                            <div className='flex w-full h-full'>
                                <Loader size='md'/>
                            </div>
                        )
                        : noticeList.length > 0
                            ? (
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-100 mobile:max-h-[23rem] mobile:overflow-y-auto"
                                >
                                    {
                                        noticeList.map((item) => (<NoticeItem item={item} key={item.alertId}/>))
                                    }
                                </ul>
                            )
                            : (
                                <div
                                    className='flex flex-col items-center justify-center w-full h-full text-3xl text-gray-600/90 text-center bg-gray-200/60 rounded-md'>
                                    <div className='pb-2'>데이터가 없습니다.</div>
                                </div>
                            )

                }
            </div>
            <CommonPagination
                activePage={pageIndex + 1}
                itemsCountPerPage={ITEM_COUNT}
                totalItemsCount={totalCount}
                pageRangeDisplayed={PAGE_RANGE}
                onChangePageHandler={(pageIndex: number) => setPageIndex(pageIndex - 1)}
            />
        </>

    );
}

export default NoticeList;