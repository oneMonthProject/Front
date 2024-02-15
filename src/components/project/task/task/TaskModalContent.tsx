'use client';
import React, {ChangeEvent} from 'react';
import {useRecoilState} from "recoil";
import {taskModalFormState} from '@/store/project/task/TaskStateStore';
import Input from '@/components/ui/form/Input';
import CalendarInput from '@/components/ui/form/CalendarInput';
import ProjectCrewSelect from "@/components/project/ProjectCrewSelect";
import TaskStatusSelector from "@/components/project/task/task/TaskStatusSelector";
import TaskContentDetail from "./TaskContentDetail/TaskContentDetail";


function TaskModalContent() {
    const [taskModalForm, setTaskModalForm] = useRecoilState(taskModalFormState);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (taskModalForm) {
            const updatedForm = {...taskModalForm, content: event.target.value};
            setTaskModalForm(updatedForm);
        }
    }

    const onDateChange = (date: string, target: 'startDate' | 'endDate') => {
        if (taskModalForm) {
            const updatedForm = {...taskModalForm, [target]: date};
            setTaskModalForm(updatedForm);
        }
    }

    return (
        <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
            <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                {taskModalForm?.type === 'modify' && (
                    <div className='flex'>
                        <label className="text-gray-700 font-semibold self-center">진행</label>
                        <div
                            className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
                            <TaskStatusSelector/>
                        </div>
                    </div>
                )}
                {
                    taskModalForm?.type === 'add' && (
                        <div className='flex space-x-10'>
                            <label htmlFor="content" className="text-gray-700 font-semibold self-center">제목</label>
                            <div className='w-[250px] mobile:w-[220px]'>
                                <Input
                                    id="content"
                                    placeholder="제목 입력"
                                    value={taskModalForm?.content}
                                    onChange={onInputChange}
                                    maxLength={20}
                                />
                            </div>
                        </div>
                    )
                }
                <div className='flex'>
                    <label className="text-gray-700 font-semibold self-center">기간</label>
                    <div className='flex w-[350px] mobile:w-[220px] ml-auto'>
                        <CalendarInput placeholder="선택" date={taskModalForm?.startDate || null}
                                       setDate={(date) => onDateChange(date, "startDate")}/>
                        <div className="text-gray-700 w-[20px] text-center self-center">~</div>
                        <CalendarInput placeholder="선택" date={taskModalForm?.endDate || null}
                                       setDate={(date) => onDateChange(date, "endDate")}/>
                    </div>
                </div>
                <div className='flex'>
                    <label htmlFor="content" className="text-gray-700 font-semibold self-center">담당</label>
                    <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
                        <ProjectCrewSelect/>
                    </div>
                </div>
                {taskModalForm?.type === 'modify' && (
                    <div className='flex'>
                        <label className="text-gray-700 font-semibold self-center">업데이트</label>
                        <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto'>
                            <div className='w-full pl-2 text-left self-center'>
                                {`${taskModalForm?.lastModifiedMemberNickname}`}
                            </div>
                        </div>
                    </div>
                )}
                <TaskContentDetail/>
            </div>
        </section>
    );
}

export default TaskModalContent;