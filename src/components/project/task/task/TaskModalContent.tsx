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
import TaskContent from "@/components/project/task/task/form/TaskContent";
import TaskDate from "@/components/project/task/task/form/TaskDate";


function TaskModalContent({form}: { form: TaskAddForm | TaskModifyForm }) {
    const setModalState = useSetRecoilState(taskModalState);

    const {
        type,
        startDate,
        endDate,
        content,
        lastModifiedMemberNickname
    } = form!;



    return (
        <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
            <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                <TaskContent/>
                <TaskStatusSelector/>
                <TaskDate/>
                `
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