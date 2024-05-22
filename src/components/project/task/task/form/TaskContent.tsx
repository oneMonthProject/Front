'use client';
import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {taskModalFieldSelector} from "@/store/project/task/TaskStateStore";

function TaskContent() {
    const [{content}, setContent] = useRecoilState(taskModalFieldSelector("content"));

    return (
        <div className='flex space-x-10'>
            <label htmlFor="content" className="text-gray-700 font-semibold self-center">제목</label>
            <div className='w-[250px] mobile:w-[220px]'>
                <Input
                    id="content"
                    placeholder="제목 입력"
                    value={content}
                    onChange={(e) => setContent({content: e.target.value})}
                    maxLength={20}
                />
            </div>
        </div>
    );
}

export default TaskContent;