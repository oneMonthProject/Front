import React from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {TaskField, taskModalFieldSelector} from "@/store/project/task/TaskStateStore";

function TaskUpdatedBy() {
    const [type] = useRecoilState(taskModalFieldSelector('type'));
    const [lastModifiedMemberNickname] = useRecoilState(taskModalFieldSelector('lastModifiedMemberNickname'));

    return type === 'modify' && (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">업데이트</label>
            <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto'>
                <div className='w-full pl-2 text-left self-center'>
                    {lastModifiedMemberNickname as TaskField<'lastModifiedMemberNickname'>}
                </div>
            </div>
        </div>
    );
}

export default TaskUpdatedBy;