import React from 'react';
import {FaMinus} from "@react-icons/all-files/fa/FaMinus";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import CrewTaskHistoryPagination from "@/components/project/crews/detail/CrewTaskHistoryPagination";

const taskTimeLine = [
    {taskId: '1', updateDate: '2023-12-12', contents: 'API 문서 작성', point: '15', pointType: 'plus'},
    {taskId: '2', updateDate: '2023-12-13', contents: 'API 문서 작성', point: '15', pointType: 'plus'},
    {taskId: '3', updateDate: '2023-12-14', contents: 'API 문서 작성', point: '30', pointType: 'minus'},
    {taskId: '4', updateDate: '2023-12-15', contents: 'API 문서 작성', point: '30', pointType: 'minus'},
    {taskId: '5', updateDate: '2023-12-16', contents: 'API 문서 작성', point: '15', pointType: 'plus'}
    // {taskId: '6', updateDate: '2023-12-17', contents: 'API 문서 작성', point: '30', pointType: 'minus'},
    // {taskId: '7', updateDate: '2023-12-17', contents: 'API 문서 작성', point: '15', pointType: 'plus'},
    // {taskId: '8', updateDate: '2023-12-17', contents: 'API 문서 작성', point: '15', pointType: 'plus'},
    // {taskId: '9', updateDate: '2023-12-17', contents: 'API 문서 작성', point: '15', pointType: 'plus'},
    // {taskId: '10', updateDate: '2023-12-17', contents: 'API 문서 작성', point: '15', pointType: 'plus'},
];

function getIconByPointType(pointType: string) {
    if (pointType === 'minus') return <FaMinus className='h-4 w-4 text-white bg-danger' aria-hidden="true"/>;
    else return <FaPlus className='h-4 w-4 text-white bg-primary' aria-hidden="true"/>
}

// todo : 업무 목록 조회
// todo: 서스펜스 & 스켈레톤 추가
function CrewTaskHistory() {

    return (
        <>
            <div className="flow-root tablet:mt-10 mobile:mt-8 mb-8 mx-2">
                <ul role="list" className="-mb-8">
                    {taskTimeLine.map((event, eventIdx) => (
                        <li key={event.taskId}>
                            <div className="relative pb-8">
                                {
                                    eventIdx !== taskTimeLine.length - 1
                                        ? (
                                            <span className="absolute left-3 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                                  aria-hidden="true"
                                            />
                                        )
                                        : null
                                }
                                <div className="relative flex space-x-3">
                                    <div className='flex items-center'>
                                  <span
                                      className={`${event.pointType === 'minus' ? 'bg-danger' : 'bg-primary'} mr-4 h-6 w-6 rounded-full flex items-center justify-center ring-8 ring-white`}
                                  >
                                    {getIconByPointType(event.pointType)}
                                  </span>
                                        <span
                                            className={`tablet:min-w-[40px] mobile:min-w-[30px] ${event.pointType === 'minus' ? 'text-danger' : 'text-primary'} leading-none tablet:text-xl mobile:text-lg font-semibold`}>
                                        {event.point}
                                    </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="tablet:text-lg mobile:text-md text-gray-500">
                                                {event.contents}
                                            </p>
                                        </div>
                                        <div className="whitespace-nowrap text-right tablet:text-md mobile:text-sm text-gray-500">
                                            <time dateTime={event.updateDate}>{event.updateDate}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <CrewTaskHistoryPagination/>
        </>
    );
}

export default CrewTaskHistory;