'use client';
import React, {useEffect} from 'react';
import {TaskItem} from "@/utils/type";
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";
import TaskCardMenu from "@/components/project/task/task/TaskCardMenu";
import {useRecoilState} from "recoil";
import {getTaskStatusCode, TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import {checkExpiration} from "@/utils/common";
import useUpsertTask from "@/hooks/useUpsertTask";
import useDeleteTask from "@/hooks/useDeleteTask";
import {useMediaQuery} from "react-responsive";

interface TaskCardProps {
    item: TaskItem;
}

function TaskCard({item}: TaskCardProps) {
    const {upsertTask, isUpdating} = useUpsertTask();
    const {deleteTask, isDeleting} = useDeleteTask();
    const [taskModalForm, setTaskModalForm] = useRecoilState(taskModalFormState);
    const isMobile = useMediaQuery({maxWidth: 700});

    // 업무 기간이 지난 상태면 자동으로 진행상태 '만료'로 업데이트
    useEffect(() => {
        if (checkExpiration(item.endDate) && item.progressStatus !== '만료') {
            const taskForm: TaskModalForm = {
                ...item,
                type: 'modify',
                progressStatus: '만료',
                progressStatusCode: getTaskStatusCode('만료')
            }

            upsertTask(taskForm);
        }
    }, []); // todo- dependency

    /**
     * 업무 삭제 click
     */
    function onClickDeleteCardHandler() {
        const confirmContent = item.progressStatus === "만료" || item.progressStatus === "완료"
            ? "완료 및 만료된 업무 삭제시 업무 완료/만료 알림도 함께 삭제됩니다. \r\n 업무를 삭제하시겠습니까?"
            : "업무를 삭제하시겠습니까?"
        if (confirm(confirmContent)) {
            deleteTask(item.workId);
        }
    }

    const contentDetailArr = item.contentDetail.split("&");

    return !isMobile ? (
            <div className="max-w-[340px] my-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="w-full flex items-center px-4 py-3 mobile:px-6 bg-ground100">
                    <div className='pc:text-[1.3rem] font-semibold text-greyDarkBlue'>{item.content}</div>
                    <div className='ml-auto self-border border-black'>
                        <TaskCardMenu
                            taskId={item.workId}
                            onEditClickHandler={() => setTaskModalForm(new TaskModalForm('modify', item))}
                            onDeleteClickHandler={onClickDeleteCardHandler}
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
                        <div className='flex-1'><TaskStatusBadge size='sm' text={item.progressStatus}/></div>
                    </div>
                    <div className='flex items-center'>
                        <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>담당</div>
                        <div className='flex-1 flex items-center space-x-3'>
                            <span className='text-greyBlue'>{item.assignedUser?.nickname}</span>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>할 일</div>
                        <div className='flex-1 flex items-center space-x-3'>
                        <span className='w-[120px] text-greyBlue/90 font-semibold truncate'>
                            {contentDetailArr[0]}
                        </span>
                            {
                                contentDetailArr.length > 1 &&
                                <span className='text-gray-600'>외 {contentDetailArr.length - 1}개</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 mobile:px-6 fl flex items-center space-x-2 text-sm text-gray-500">
                    <span>업데이트 :</span>
                    <span>{item.lastModifiedMemberNickname}</span>
                </div>
            </div>
        )

        : (
            <div
                className="w-[340px] flex flex-wrap items-center justify-between
                 gap-x-6 gap-y-4 px-3 py-5 mobile:flex-nowrap border border-gray-200 rounded-lg shadow-md"
            >
                <div>
                    <div className="flex items-center justify-start space-x-2">
                    <span className="text-sm font-semibold leading-6 text-greyBlue">
                        {item.content}
                    </span>
                    </div>
                    <p className='text-xs text-greyBlue'>{item.startDate} ~ {item.endDate}</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <div className="flex items-center space-x-2 mt-1 text-sm leading-5 text-greyBlue">
                        <p>{item.assignedUser?.nickname}</p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1}/>
                        </svg>
                        <TaskStatusBadge text={item.progressStatus} size='xs'/>
                    </div>
                    <div className='ml-auto self-border border-black'>
                        <TaskCardMenu
                            taskId={item.workId}
                            onEditClickHandler={() => setTaskModalForm(new TaskModalForm('modify', item))}
                            onDeleteClickHandler={onClickDeleteCardHandler}
                        />
                    </div>
                </div>
            </div>
        );
}

export default TaskCard;