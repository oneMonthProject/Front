'use client';
import React, {useEffect} from 'react';
import {TaskItem} from "@/utils/type";
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";
import TaskCardMenu from "@/components/project/task/task/TaskCardMenu";
import {useRecoilState, useSetRecoilState} from "recoil";
import {getTaskStatusCode, TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask as deleteTaskAPI} from "@/service/project/task";
import {snackbarState} from '@/store/CommonStateStore';
import {checkExpiration} from "@/utils/common";
import useUpsertTask from "@/hooks/useUpsertTask";

interface TaskCardProps {
    item: TaskItem;
}

function TaskCard({item}: TaskCardProps) {
    const {upsertTask, isUpdating} = useUpsertTask();
    const [taskModalForm, setTaskModalForm] = useRecoilState(taskModalFormState);
    const setSnackbar = useSetRecoilState(snackbarState);

    const queryClient = useQueryClient();

    const {mutate: deleteTask, isPending: isDeleting} = useMutation({
        mutationFn: (workId: bigint) => deleteTaskAPI(workId),
        onSuccess: async (res) => {
            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 삭제했습니다'});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '예상치 못한 서버 에러가 발생했습니다'});
            }
        },
        onError: (error) => {
            console.log("error: ", error);
            setSnackbar({show: true, type: 'ERROR', content: '예상치 못한 서버 에러가 발생했습니다'});
        }
    })

    // 업무 기간이 지난 상태면 자동으로 진행상태 '만료'로 업데이트
    useEffect(() => {
        if (checkExpiration(item.endDate) && item.progressStatus !== '만료') {
            const taskForm: TaskModalForm = {
                ...item,
                type: 'modify',
                progressStatus:'만료',
                progressStatusCode: getTaskStatusCode('만료')
            }

            upsertTask(taskForm);
        }
    },[])



    return (
        <div className="max-w-[340px] my-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="w-full flex items-center px-4 py-3 mobile:px-6 bg-ground100">
                <div className='pc:text-[1.3rem] font-semibold text-greyDarkBlue'>{item.content}</div>
                <div className='ml-auto self-border border-black'>
                    <TaskCardMenu
                        taskId={item.workId}
                        onEditClickHandler={() => setTaskModalForm(new TaskModalForm('modify', item))}
                        onDeleteClickHandler={() => deleteTask(item.workId)}
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
            </div>
            <div className="px-4 py-3 mobile:px-6 fl flex items-center space-x-2 text-sm text-gray-500">
                <span>업데이트 :</span>
                <span>{item.lastModifiedMemberNickname}</span>
            </div>
        </div>
    );
}

export default TaskCard;