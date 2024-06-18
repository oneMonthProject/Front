'use client';

import React, {Suspense, useRef} from 'react';
import {useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {getUserProjectNotice as getUserProjectNoticeAPI} from "@/service/user/userNotice";
import {PageResponseBody, UserProjectNotice} from "@/utils/type";
import {FormattedUserProjectNotice} from "@/store/UserNoticeModalStateStore";
import ParticipateNotice from "@/components/main/myProjectPost/ParticipateNotice/ParticipateNotice";
import Loader from "@/components/ui/Loader";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {ITEM_COUNT} from "@/utils/constant";


function ParticipateNoticeModalContents() {
    const bottomRef = useRef<HTMLLIElement | null>(null);
    const rootRef = useRef<HTMLUListElement | null>(null);

    const getUserProjectNotice = async (pageIndex: number, ITEM_COUNT: number) => {
        const res = await getUserProjectNoticeAPI(pageIndex, ITEM_COUNT);
        if (res.result !== 'success') {
            throw new Error('프로젝트 지원 현황 조회에 실패했습니다.');
        }

        return res;
    }

    const {data, fetchNextPage} = useSuspenseInfiniteQuery<PageResponseBody<UserProjectNotice[]>>({
        queryKey: ['userProjectNotice'],
        queryFn: ({pageParam}) => getUserProjectNotice(pageParam as number, ITEM_COUNT.LIST_SM),
        staleTime: 0,
        retry: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            const nextPage = parseInt(lastPageParam as string, 10) + 1;
            if (nextPage * ITEM_COUNT.LIST_SM > lastPage.data.totalPages) return false;
            return nextPage;
        }
    });


    const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entries[0].isIntersecting) {
            fetchNextPage();
        }
    };

    useIntersectionObserver({
        target: bottomRef,
        root: rootRef,
        onIntersectHandler: onIntersect
    });

    const noticeList: FormattedUserProjectNotice[] = [];
    data.pages.forEach((v) => {
        const itemsPerPage = v.data.content;
        itemsPerPage.forEach(v => {
            noticeList.push({
                alertId: v.alertId,
                projectId: v.project.projectId,
                projectName: v.project.projectName,
                positionId: v.position.positionId,
                positionName: v.position.positionName,
                supportResult: v.supportResult
            });
        })
    });

    const totalItemCount = data.pages[0].data.totalPages;
    const totalPageCount = Math.ceil(totalItemCount / ITEM_COUNT.LIST_SM);
    const isEndPage = data.pageParams.length === totalPageCount;

    return (
        <ul
            role="list"
            className="min-w-[340px] max-h-[300px] overflow-y-auto divide-y divide-gray-100 "
            ref={rootRef}
        >
            {
                totalItemCount > 0 ?
                    noticeList.map(v => {
                        return (
                            <li
                                key={v.alertId}
                                className="flex items-center justify-between gap-x-6 w-full px-2 py-5">
                                <ParticipateNotice
                                    key={v.alertId}
                                    participateNotice={v}
                                />
                            </li>
                        )
                    })
                    : (
                        <li className='flex items-center justify-center mobile:w-[320px] tablet:w-[450px] h-[150px] bg-gray-100 rounded-md'>
                            <div className='text-xl text-center text-gray-600/80'>데이터가 없습니다.</div>
                        </li>
                    )
            }
            {
                totalItemCount > 0 &&
                (
                    isEndPage
                        ?
                        <li className='flex items-center justify-center w-full h-[100px] text-lg text-center text-gray-600/80'>
                            <div>데이터가 더 이상 존재하지 않습니다</div>
                        </li>
                        :
                        <li ref={bottomRef} className='flex items-center w-full h-[80px]'>
                            <Loader size='sm'/>
                        </li>
                )
            }
        </ul>
    );
}

export default ParticipateNoticeModalContents;