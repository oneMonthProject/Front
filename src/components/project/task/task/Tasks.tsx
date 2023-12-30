'use client';
import React from 'react';
import TaskCard from "@/components/project/task/task/TaskCard";
import TaskPagination from "@/components/project/task/task/TaskPagination";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getTaskList} from "@/service/project/task";
import {useQueryString} from "@/hooks/useQueryString";
import {ResponseBody, TaskItem} from "@/utils/type";

interface TasksProps {
    milestoneId: bigint | string;
}

function Tasks({milestoneId}: TasksProps) {
    const projectId = useQueryString('projectId');
    const res = useSuspenseQuery<ResponseBody<TaskItem[]>, Error>({
        queryKey: ['taskList'],
        queryFn: () => getTaskList({milestoneId, projectId})
    });


    const taskList = res.data.data;

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
            <TaskPagination/>
        </div>
    );
}

// todo - 마일스톤 아이디(전역에 저장)로 업무 목록 조회

export default Tasks;