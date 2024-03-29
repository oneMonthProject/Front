'use client';
import React, {useState} from 'react';
import {FaMinus} from "@react-icons/all-files/fa/FaMinus";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useQueryString} from "@/hooks/useQueryString";
import {getCrewTaskHistory} from "@/service/project/crews";
import CommonPagination from "@/components/ui/CommonPagination";
import {CrewTaskHistory, PageResponseBody} from "@/utils/type";


function getIconByPointType(pointType: string) {
    if (pointType === 'minus') return <FaMinus className='h-4 w-4 text-white bg-danger' aria-hidden="true"/>;
    else return <FaPlus className='h-4 w-4 text-white bg-primary' aria-hidden="true"/>
}

const ITEM_PER_PAGE = 5;
const PAGE_RANGE = 5;

function CrewTaskHistory() {
    const [pageIndex, setPageIndex] = useState(0);
    const projectMemberId = useQueryString('projectMemberId');

    const {data} = useSuspenseQuery<PageResponseBody<CrewTaskHistory[]>, Error>({
        queryKey: ['crewTaskHistory', projectMemberId, pageIndex, ITEM_PER_PAGE],
        queryFn: () => getCrewTaskHistory(projectMemberId, pageIndex, ITEM_PER_PAGE)
    });

    const taskHistory = data.data.content;
    const totalCount = data.data.totalPages;

    return (
        <>
            <div className="flow-root tablet:mt-10 mobile:mt-8 mb-8 mx-2">
                {
                    taskHistory.length > 0
                        ? (
                            <ul role="list" className="-mb-8">
                                {taskHistory.map((event, eventIdx) => (
                                    <li key={event.trustScoreHistoryId}>
                                        <div className="relative pb-8">
                                            {
                                                eventIdx !== taskHistory.length - 1
                                                    ? (
                                                        <span
                                                            className="absolute left-3 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                                            aria-hidden="true"
                                                        />
                                                    )
                                                    : null
                                            }
                                            <div className="relative flex space-x-3">
                                                <div className='flex items-center'>
                                                    {
                                                        event.point && event.point_type ?
                                                            <>
                                                  <span
                                                      className={`${event.point_type === 'minus' ? 'bg-danger' : 'bg-primary'} mr-4 h-6 w-6 rounded-full flex items-center justify-center ring-8 ring-white`}
                                                  >
                                                      {getIconByPointType(event.point_type)}
                                                  </span>
                                                                <span
                                                                    className={`tablet:min-w-[40px] mobile:min-w-[30px] ${event.point_type === 'minus' ? 'text-danger' : 'text-primary'} leading-none tablet:text-xl mobile:text-lg font-semibold`}
                                                                >
                                                        {event.point}
                                                    </span>
                                                            </> : null
                                                    }
                                                </div>
                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p className="tablet:text-lg mobile:text-md text-gray-500">
                                                            {event.workContent}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="flex items-center space-x-1 whitespace-nowrap text-right tablet:text-md mobile:text-sm text-gray-500">
                                                        <span>{event.startDate}</span>
                                                        <span>&#126;</span>
                                                        <span>{event.endDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                        :
                        (
                            <div
                                className='flex flex-col items-center justify-center w-full h-[300px] text-3xl text-gray-600/90 text-center bg-gray-200/60 rounded-md'>
                                <div className='pb-2'>데이터가 없습니다.</div>
                            </div>
                        )
                }
            </div>
            <CommonPagination
                activePage={pageIndex + 1}
                pageRangeDisplayed={PAGE_RANGE}
                itemsCountPerPage={ITEM_PER_PAGE}
                totalItemsCount={totalCount}
                onChangePageHandler={(pageIndex: number) => setPageIndex(pageIndex - 1)}
            />
        </>
    );
}

export default CrewTaskHistory;