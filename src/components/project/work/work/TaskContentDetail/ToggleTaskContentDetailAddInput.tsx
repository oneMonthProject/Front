import React, {useState} from 'react';
import {RiAddLine} from "@react-icons/all-files/ri/RiAddLine";
import TaskContentDetailAddInput from "@/components/project/work/work/TaskContentDetail/TaskContentDetailAddInput";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {taskContentDetailSelector, taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {MAX_TASK_CONTENT_DETAIL, TASK_STATUS} from "@/app/project/@task/_utils/constant";
import {snackbarState} from "@/store/CommonStateStore";

function ToggleTaskContentDetailAddInput() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const [showAddElement, setShowAddElement] = useState(false);
    const taskContentDetailMap = useRecoilValue(taskContentDetailSelector);
    const {progressStatusCode} = useRecoilValue(taskProgressModFieldSelector)

    return (
        <>
            <button
                onClick={() => {
                    if(taskContentDetailMap.size >= MAX_TASK_CONTENT_DETAIL){
                        setSnackbar({show: true, type: 'INFO', content: '할 일은 업무당 최대 5개 추가할 수 있습니다.'});
                        return;
                    }
                    setShowAddElement((prev) => !prev)
                }}
                className={`group w-full flex items-center space-x-1 py-2 px-1 text-lg mobile:text-base text-gray-600 leading-[2.15rem] font-semibold ${showAddElement && 'bg-gray-50'} disabled:text-gray-600/70`}
                disabled={progressStatusCode === TASK_STATUS.PS003.value}
            >
                <RiAddLine/>
                <span>추가</span>
                <span className='text-sm mobile:text-xs text-gray-500 group-disabled:text-gray-500/70'>(최대 5개)</span>
            </button>
            {showAddElement && <TaskContentDetailAddInput setIsOpen={setShowAddElement}/>}
        </>
    );
}

export default ToggleTaskContentDetailAddInput;