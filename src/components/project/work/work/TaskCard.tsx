'use client';
import React from 'react';
import TaskStatusBadge from "@/components/ui/badge/TaskStatusBadge";
import TaskCardMenu from "@/components/project/work/work/TaskCardMenu";
import {useMediaQuery} from "react-responsive";
import {TaskItem} from "@/app/project/@task/_utils/type";
import {ProjectAuthMap} from "@/utils/type";

interface TaskCardProps {
    item: TaskItem;
    authMap: ProjectAuthMap;
}

function TaskCard({item, authMap}: TaskCardProps) {
    const {
        startDate,
        endDate, content,
        contentDetail,
        progressStatus,
        lastModifiedMemberNickname,
        assignedUser,
    } = item;

    const isMobile = useMediaQuery({maxWidth: 700});


    const contentDetailArr = contentDetail.split("&");

    return !isMobile ? (
            <div className="max-w-[340px] my-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="w-full flex items-center px-4 py-3 mobile:px-6 bg-ground100">
                    <div className='pc:text-[1.3rem] font-semibold text-greyDarkBlue'>{content}</div>
                    <div className='ml-auto self-border border-black'>
                        <TaskCardMenu taskItem={item} authMap={authMap}/>
                    </div>
                </div>
                <div className="w-[330px] flex flex-col space-y-5 px-4 py-5 mobile:p-6">
                    <div className='flex items-center'>
                        <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>기간</div>
                        <div className='flex-1 text-greyBlue '>{startDate} ~ {endDate}</div>
                    </div>
                    <div className='flex items-center'>
                        <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>진행 상태</div>
                        <div className='flex-1'><TaskStatusBadge size='sm' text={progressStatus.name}/></div>
                    </div>
                    <div className='flex items-center'>
                        <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>담당</div>
                        <div className='flex-1 flex items-center space-x-3'>
                            <span className='text-greyBlue'>{assignedUser?.nickname}</span>
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
                    <span>{lastModifiedMemberNickname}</span>
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
                        {content}
                    </span>
                    </div>
                    <p className='text-xs text-greyBlue'>{startDate} ~ {endDate}</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <div className="flex items-center space-x-2 mt-1 text-sm leading-5 text-greyBlue">
                        <p>{assignedUser?.nickname}</p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1}/>
                        </svg>
                        <TaskStatusBadge text={progressStatus.name} size='xs'/>
                    </div>
                    <div className='ml-auto self-border border-black'>
                        <TaskCardMenu taskItem={item} authMap={authMap}/>
                    </div>
                </div>
            </div>
        );
}

export default TaskCard;