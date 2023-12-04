import React from 'react';
import TaskCard from "@/components/project/task/task/TaskCard";
import TaskPagination from "@/components/project/task/task/TaskPagination";


const items = [
    {
        workId: '1',
        workContent: 'db 스키마 설계',
        startDate: '2023-12-11',
        endDate: '2023-12-17',
        completeStatus: false,
        expiredStatus: false,
        updateDate: '2023-12-01',
        assignedUserId: 'tester01'
    },
    {
        workId: '2',
        workContent: 'db 스키마 설계',
        startDate: '2023-12-11',
        endDate: '2023-12-17',
        completeStatus: true,
        expiredStatus: false,
        updateDate: '2023-12-01',
        assignedUserId: 'tester01'
    },
    {
        workId: '3',
        workContent: 'db 스키마 설계',
        startDate: '2023-12-11',
        endDate: '2023-12-17',
        completeStatus: false,
        expiredStatus: false,
        updateDate: '2023-12-01',
        assignedUserId: 'tester01'
    },
    {
        workId: '4',
        workContent: 'db 스키마 설계',
        startDate: '2023-12-11',
        endDate: '2023-12-17',
        completeStatus: false,
        expiredStatus: false,
        updateDate: '2023-12-01',
        assignedUserId: 'tester01'
    },
    {
        workId: '5',
        workContent: 'db 스키마 설계',
        startDate: '2023-12-11',
        endDate: '2023-12-17',
        completeStatus: false,
        expiredStatus: false,
        updateDate: '2023-12-01',
        assignedUserId: 'tester01'
    },
    {
        workId: '6',
        workContent: 'db 스키마 설계',
        startDate: '2023-12-11',
        endDate: '2023-12-17',
        completeStatus: false,
        expiredStatus: false,
        updateDate: '2023-12-01',
        assignedUserId: 'tester01'
    }
];

function Tasks() {
    return (
        <div className='w-full mt-4 flex flex-col items-center'>
            {
                items.length > 0 ?
                    <ul className='w-full grid grid-cols-3 grid-rows-2 place-items-center gap-4 '>
                        {items.map(v =>
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