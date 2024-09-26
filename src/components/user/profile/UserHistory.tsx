'use client';
import React, {useState} from "react";
import Link from "next/link";
import {BiUser} from "@react-icons/all-files/bi/BiUser";
import {BiUndo} from "@react-icons/all-files/bi/BiUndo";
import {BiCheck} from "@react-icons/all-files/bi/BiCheck";
import {BiX} from "@react-icons/all-files/bi/BiX";
import CommonPagination from "@/components/ui/CommonPagination";
import {getUserProjectHistory} from "@/service/user/user";
import {classNames} from "@/utils/common";
import {PageResponseBody, UserProjectHistoryData, UserProjectHistoryStatus} from "@/utils/type";
import {useQuery} from "@tanstack/react-query";
import {GrScorecard} from "@react-icons/all-files/gr/GrScorecard";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import UserHistorySkeleton from "@/components/user/profile/UserHistorySkeleton";
import {AiFillRocket} from "@react-icons/all-files/ai/AiFillRocket";

const getIconColorByStatus = (status: UserProjectHistoryStatus) => {
    switch (status.code) {
        case "PHIST_STAT_001":
            return 'bg-orange-400';
        case "PHIST_STAT_002":
            return 'bg-blue-500';
        case "PHIST_STAT_003":
            return 'bg-green-500';
        case "PHIST_STAT_004":
            return 'bg-gray-400';
        case "PHIST_STAT_005":
            return 'bg-red-400';
        default:
            return ''
    }
}

const getIconByStatus = (status: UserProjectHistoryStatus) => {
    const iconClassName = 'h-5 w-5 text-white';

    switch (status.code) {
        case "PHIST_STAT_001":
            return <AiFillRocket className={iconClassName} aria-hidden="true"/>;
        case "PHIST_STAT_002":
            return <BiUser className={iconClassName} aria-hidden={true}/>;
        case "PHIST_STAT_003":
            return <BiCheck className={iconClassName} aria-hidden="true"/>
        case "PHIST_STAT_004":
            return <BiUndo className={iconClassName} aria-hidden="true"/>
        case "PHIST_STAT_005":
            return <BiX className={iconClassName} aria-hidden="true"/>
        default:
            return <></>
    }
}


function UserHistory() {
    const [pageNumber, setPageNumber] = useState(0);
    const {data, isFetching} = useQuery<PageResponseBody<UserProjectHistoryData[]>, Error>({
        queryKey: ['userHistory', pageNumber],
        queryFn: () => getUserProjectHistory(pageNumber),
        staleTime: 0,
        // retry: false
    });

    if (isFetching) return <UserHistorySkeleton/>;

    const {content: histories, totalPages} = data!.data;

    return (
        <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
            <div
                className='flex items-center tablet:text-2xl mobile:text-lg font-semibold text-greyDarkBlue my-8 mobile:my-4'>
                <GrScorecard className='tablet:text-[1.5rem]'/>
                <h3 className='ml-2'>사용자 프로젝트 이력</h3>
            </div>
            <div className="flow-root mx-2">
                {histories.length > 0 ? (
                    <>
                        <ul role="list" className="-mb-8">
                            {histories.map((history, idx) => (
                                <li key={history.userProjectHistoryId}>
                                    <div className="relative pb-8">
                                        {idx !== histories.length - 1 ? (
                                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                                  aria-hidden="true"/>
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span
                                                    className={classNames(
                                                        getIconColorByStatus(history.status),
                                                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                                    )}>
                                                  {getIconByStatus(history.status)}
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 ">
                                                    <div className="font-medium text-gray-900">
                                                        {history.projectName}
                                                    </div>
                                                    <div className='mobile:hidden'>
                                                        {history.status.name}
                                                    </div>
                                                </div>
                                                <div
                                                    className="whitespace-nowrap text-right text-sm text-gray-500 ">
                                                    <time
                                                        dateTime={history.updateDate}>{new Date(history.updateDate).toDateString()}</time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <CommonPagination
                            activePage={pageNumber + 1}
                            itemsCountPerPage={ITEM_COUNT.LIST_SM}
                            totalItemsCount={totalPages}
                            pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                            onChangePageHandler={(page) => setPageNumber(page - 1)}/>
                    </>
                ) : (
                    <div className='w-full bg-ground100 text-center rounded-md mb-10 mobile:mb-4'>
                        <p className='py-10 text-2xl font-medium text-grey900'>이력이 존재하지 않습니다.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserHistory;