'use client';
import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState, useRecoilValue} from "recoil";
import {TaskField, taskModalFieldSelector, taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

function TaskContent() {
    const [content, setContent] = useRecoilState(taskModalFieldSelector("content"));
    const {progressStatusCode} = useRecoilValue(taskProgressModFieldSelector)

    return (
        <div className='flex space-x-10'>
            <label htmlFor="content" className="text-gray-700 font-semibold self-center">제목</label>
            <div className='w-[250px] mobile:w-[220px]'>
                <Input
                    id="content"
                    placeholder="제목 입력"
                    value={content as TaskField<'content'>}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={20}
                    disabled={progressStatusCode === TASK_STATUS.PS003.value}
                />
            </div>
        </div>
    );
}

export default TaskContent;