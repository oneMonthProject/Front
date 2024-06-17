'use client';
import React, {useState} from 'react';
import {PageResponseBody, ProjectTaskAuth, ResponseBody} from "@/utils/type";
import NoticeItem from "@/components/project/notice/NoticeItem";
import {useQuery} from "@tanstack/react-query";
import {getProjectNoticeByMenu} from "@/service/project/notice";
import CommonPagination from "@/components/ui/CommonPagination";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {projectNoticeActiveMenuStateStore} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import Loader from "@/components/ui/Loader";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import {Notice} from "@/app/project/@notice/_utils/type";
import {projectIdState, projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";


function NoticeList() {
    const [pageIndex, setPageIndex] = useState(0);
    const activeNoticeMenu = useRecoilValue(projectNoticeActiveMenuStateStore);

    const projectId = useRecoilValue(projectIdState);

    // 알림 확인 & 컨펌 관련 권한
    const {state: authState, contents: authContents} = useRecoilValueLoadable<ResponseBody<ProjectTaskAuth | null>>(projectTaskAuthSelector(null));

    // 5초마다 백그라운드에서 알림 목록 refetch
    const {data, isFetching:isFetchingNotice} = useQuery<Promise<PageResponseBody<Notice[]>>, Error, PageResponseBody<Notice[]>>({
        queryKey: ['noticeList', projectId, pageIndex, activeNoticeMenu],
        queryFn: () => getProjectNoticeByMenu(BigInt(projectId!), pageIndex, ITEM_COUNT.LIST_SM, activeNoticeMenu),
        refetchInterval: 60000,
        refetchIntervalInBackground: true
    });

    const noticeList = data?.data.content || [];
    const totalCount = data?.data.totalPages || 0;

    const isFetching = isFetchingNotice || authState === 'loading'

    return (
        <>
            <div className='tablet:h-[300px]'>
                {
                    isFetching || (!isFetching && authContents.result !== "success")
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
                                        noticeList.map((item) => (
                                            <NoticeItem
                                                item={item}
                                                key={item.alertId}
                                                isAuthorized={authContents.data.milestoneAuth}
                                            />)
                                        )
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