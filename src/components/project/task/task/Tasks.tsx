'use client';

import React, {useState} from 'react';
import TaskCard from "@/components/project/task/task/TaskCard";
import {DataId} from "@/utils/type";
import CommonPagination from "@/components/ui/CommonPagination";
import useTasks from "@/hooks/useTasks";
import TasksSkeleton from "@/components/ui/skeleton/project/task/TasksSkeleton";
import {ITEM_COUNT} from "@/utils/constant";


function Tasks({milestoneId, projectId}: { milestoneId: DataId, projectId: DataId }) {
    const [pageNumber, setPageNumber] = useState(0);

    const {
        taskList,
        totalPages,
        isTasksFetching,
        isTasksError
    } = useTasks({
        projectId,
        milestoneId,
        pageNumber,
        itemsPerPage: ITEM_COUNT.TASKS
    })


    function onChangePageHandler(pageNumber: number) {
        setPageNumber(pageNumber - 1);
    }


    return isTasksFetching
        ? <TasksSkeleton itemCount={ITEM_COUNT.TASKS}/>
        : (
            <div className='w-full mt-4 flex flex-col items-center'>
                {
                    taskList.length > 0 ?
                        <ul className='w-full grid grid-cols-3 mobile:grid-cols-1 grid-rows-2 mobile:grid-rows-1 place-items-center gap-4 '>
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
                    totalItemsCount={totalPages}
                    pageRangeDisplayed={5}
                    itemsCountPerPage={ITEM_COUNT.TASKS}
                    onChangePageHandler={onChangePageHandler}
                />
            </div>
        );
}

// todo - 마일스톤 아이디(전역에 저장)로 업무 목록 조회

export default Tasks;