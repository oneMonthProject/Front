'use client';
import React, {useState} from 'react';
import TaskCard from "@/components/project/task/task/TaskCard";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getTaskList} from "@/service/project/task";
import {useQueryString} from "@/hooks/useQueryString";
import {PageResponseBody, TaskItem} from "@/utils/type";
import CommonPagination from "@/components/ui/CommonPagination";

interface TasksProps {
    milestoneId: bigint | string;
}

const ITEMS_PER_PAGE = 6;

function Tasks({milestoneId}: TasksProps) {
    const projectId = useQueryString('projectId');
    const [pageNumber, setPageNumber] = useState(0);

    const res = useSuspenseQuery<PageResponseBody<TaskItem[]>, Error>({
        queryKey: ['taskList', milestoneId, projectId, pageNumber, ITEMS_PER_PAGE],
        queryFn: () => getTaskList({
            milestoneId,
            projectId,
            pageIndex: pageNumber,
            itemCount: ITEMS_PER_PAGE
        })
    });


    function onChangePageHandler(pageNumber: number) {
        setPageNumber(pageNumber - 1);
    }

    const taskList = res.data.data.content;
    const totalCount = res.data.data.totalPages;

    return (
        <div className='w-full mt-4 flex flex-col items-center'>
            {
                taskList.length > 0 ?
                    <ul className='w-full grid grid-cols-3 grid-rows-2 place-items-center gap-4 '>
                        {taskList.map(v =>
                            (
                                <li key={v.workId}>
                                    <TaskCard item={v}/>
                                </li>
                            ))}
                    </ul>
                    :
                    <div className='w-full h-[14rem] flex items-center justify-center bg-ground200 rounded-lg'>
                        <span className='tablet:text-3xl text-grey800 font-semibold'>업무를 추가해 주세요</span>
                    </div>

            }
            <CommonPagination
                activePage={pageNumber + 1}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                itemsCountPerPage={ITEMS_PER_PAGE}
                onChangePageHandler={onChangePageHandler}
            />
        </div>
    );
}

// todo - 마일스톤 아이디(전역에 저장)로 업무 목록 조회

export default Tasks;