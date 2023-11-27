import React from 'react';
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";

const taskList = [
    {taskId: '1', contents: 'API 문서 작성', status: '진행중', point: '', pointType: ''},
    {taskId: '2', contents: 'API 문서 작성', status: '완료', point: '15', pointType: 'plus'},
    {taskId: '3', contents: 'API 문서 작성', status: '진행중', point: '', pointType: ''},
    {taskId: '4', contents: 'API 문서 작성', status: '완료', point: '30', pointType: 'minus'},
    {taskId: '5', contents: 'API 문서 작성', status: '완료', point: '15', pointType: 'plus'},
    {taskId: '6', contents: 'API 문서 작성', status: '완료', point: '30', pointType: 'minus'},
    {taskId: '7', contents: 'API 문서 작성', status: '진행중', point: '', pointType: ''},
]

// todo : 업무 목록 조회
// todo: 서스펜스 & 스켈레톤 추가
function CrewTaskHistory() {
    return (
        <ul className='w-full'>
            {
                taskList.map(
                    (v) =>
                        <li
                            key={v.taskId}
                            className='flex items-center'
                        >
                            <TaskStatusBadge size='sm' text={v.status}/>
                            <span className='tablet:ml-4 mobile:ml-2 mr-auto'>{v.contents}</span>
                            <span
                                className={`${v.pointType === 'minus' ? 'text-[#D22E1D]' : 'text-primary'} font-semibold`}>
                                {v.contents}
                            </span>
                        </li>
                )
            }
        </ul>
    );
}

export default CrewTaskHistory;