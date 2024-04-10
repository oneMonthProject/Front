'use client';
import React, {useState} from 'react';
import {PageResponseBody} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";
import {useQuery} from "@tanstack/react-query";
import {useQueryString} from "@/hooks/useQueryString";
import {getProjectNoticeByMenu} from "@/service/project/notice";
import CommonPagination from "@/components/ui/CommonPagination";
import {useRecoilValue} from "recoil";
import {projectNoticeActiveMenuStateStore} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import Loader from "@/components/ui/Loader";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import {Notice} from "@/app/project/@notice/_utils/type";


function NoticeList() {
    const projectId = useQueryString('projectId');
    const [pageIndex, setPageIndex] = useState(0);
    const {value} = useRecoilValue(projectNoticeActiveMenuStateStore);

    // 5초마다 백그라운드에서 알림 목록 refetch
    const {data, isFetching} = useQuery<Promise<PageResponseBody<Notice[]>>, Error, PageResponseBody<Notice[]>>({
        queryKey: ['noticeList', projectId, pageIndex, value],
        queryFn: () => getProjectNoticeByMenu(projectId, pageIndex, ITEM_COUNT.LIST_SM, value),
        refetchInterval: 60000,
        refetchIntervalInBackground: true
    });

    const noticeList = data?.data.content || [];
    const totalCount = data?.data.totalPages || 0;

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
                                    className="divide-y mobile:max-h-[23rem] mobile:overflow-y-auto"
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
                itemsCountPerPage={ITEM_COUNT.LIST_SM}
                totalItemsCount={totalCount}
                pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                onChangePageHandler={(pageIndex: number) => setPageIndex(pageIndex - 1)}
            />
        </>

    );
}

export default NoticeList;