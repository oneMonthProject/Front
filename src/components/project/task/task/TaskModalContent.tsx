'use client';
import React, {ChangeEvent} from 'react';
import {useSetRecoilState} from "recoil";
import {TaskModalState, taskModalState} from '@/store/project/task/TaskStateStore';
import Input from '@/components/ui/form/Input';
import CalendarInput from '@/components/ui/form/CalendarInput';
import ProjectCrewSelect from "@/components/project/ProjectCrewSelect";
import TaskStatusSelector from "@/components/project/task/task/TaskStatusSelector";
import TaskContentDetail from "./TaskContentDetail/TaskContentDetail";
import {TaskAddForm, TaskModifyForm} from "@/app/project/@task/_utils/type";


function TaskModalContent({form}: { form: TaskAddForm | TaskModifyForm }) {
    const setModalState = useSetRecoilState(taskModalState);

    const {
        type,
        startDate,
        endDate,
        content,
        lastModifiedMemberNickname
    } = form!;

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const updatedForm: typeof form = {...form, content: event.target.value};
        const updatedFormState: TaskModalState<typeof form> = {isOpen: true, form: updatedForm}
        setModalState(updatedFormState);
    }

    const onDateChange = (date: string, target: 'startDate' | 'endDate') => {
        const updatedForm: typeof form = {...form, [target]: date};
        const updatedFormState: TaskModalState<typeof form> = {isOpen: true, form: updatedForm}
        setModalState(updatedFormState);
    }

    return (
        <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
            <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                {type === 'modify' && (
                    <div className='flex'>
                        <label className="text-gray-700 font-semibold self-center">진행</label>
                        <div
                            className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
                            <TaskStatusSelector/>
                        </div>
                    </div>
                )}
                {
                    type === 'add' && (
                        <div className='flex space-x-10'>
                            <label htmlFor="content" className="text-gray-700 font-semibold self-center">제목</label>
                            <div className='w-[250px] mobile:w-[220px]'>
                                <Input
                                    id="content"
                                    placeholder="제목 입력"
                                    value={content}
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
                        <CalendarInput placeholder="선택" date={startDate || null}
                                       setDate={(date) => onDateChange(date, "startDate")}/>
                        <div className="text-gray-700 w-[20px] text-center self-center">~</div>
                        <CalendarInput placeholder="선택" date={endDate || null}
                                       setDate={(date) => onDateChange(date, "endDate")}/>
                    </div>
                </div>
                <div className='flex'>
                    <label htmlFor="content" className="text-gray-700 font-semibold self-center">담당</label>
                    <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
                        <ProjectCrewSelect/>
                    </div>
                </div>
                {type === 'modify' && (
                    <div className='flex'>
                        <label className="text-gray-700 font-semibold self-center">업데이트</label>
                        <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto'>
                            <div className='w-full pl-2 text-left self-center'>
                                {lastModifiedMemberNickname}
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