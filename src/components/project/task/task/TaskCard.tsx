'use client';
import React from 'react';
import {TaskItem} from "@/utils/type";
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";
import Avatar from "@/components/ui/Avatar";
import TaskCardMenu from "@/components/project/task/task/TaskCardMenu";
import {useRecoilState} from "recoil";
import {TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import TaskModal from "@/components/project/task/task/TaskModal";


interface TaskCardProps {
    item: TaskItem;
}

function TaskCard({item}: TaskCardProps) {
    const [taskModalForm, setTaskModalForm] = useRecoilState(taskModalFormState);

    function onEditClickHandler() {
        setTaskModalForm(new TaskModalForm('modify', item));
    }

    function onDeleteClickHandler() {
        // todo - 업무 삭제 api
    }


    return (
        <div className="max-w-[340px] my-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="w-full flex items-center px-4 py-3 mobile:px-6 bg-ground100">
                <span className='pc:text-[1.3rem] font-semibold text-greyDarkBlue'>{item.content}</span>
                {/*<p className='ml-auto pc:text-sm text-grey800'>업데이트: {item.updateDate}</p>*/}
                <div className='ml-auto self-border border-black'>
                    <TaskCardMenu
                        taskId={item.workId}
                        onEditClickHandler={onEditClickHandler}
                        onDeleteClickHandler={onDeleteClickHandler}
                    />
                </div>
            </div>
            <div className="w-[330px] flex flex-col space-y-5 px-4 py-5 mobile:p-6">
                <div className='flex items-center'>
                    <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>기간</div>
                    <div className='flex-1 text-greyBlue '>{item.startDate} ~ {item.endDate}</div>
                </div>
                <div className='flex items-center'>
                    <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>진행 상태</div>
                    <div className='flex-1'><TaskStatusBadge size='sm' text='진행중'/></div>
                </div>
                <div className='flex items-center'>
                    <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>담당</div>
                    <div className='flex-1 flex items-center space-x-3'>
                        <Avatar alt='담당자 프로필 이미지' size='xs'/>
                        <span className='text-greyBlue'>{item.assignedUser?.nickname}</span>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 mobile:px-6 fl flex items-center space-x-2 text-sm text-gray-500">
                <span>업데이트 :</span>
                <span>{item.lastModifiedMemberNickname}</span>
            </div>
        </div>
    );
}

export default TaskCard;