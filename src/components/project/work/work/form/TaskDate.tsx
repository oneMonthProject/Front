import React from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState, useRecoilValue} from "recoil";
import {taskModalFieldSelector, taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

function TaskDate() {
    const [startDate, setStartDate] = useRecoilState(taskModalFieldSelector('startDate'));
    const [endDate, setEndDate] = useRecoilState(taskModalFieldSelector('endDate'));
    const {progressStatusCode} = useRecoilValue(taskProgressModFieldSelector)

    return (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">기간</label>
            <div className='flex w-[350px] mobile:w-[220px] ml-auto'>
                <CalendarInput
                    placeholder="선택"
                    date={startDate as string|| null}
                    setDate={(date) => setStartDate(date)}
                    disabled={progressStatusCode === TASK_STATUS.PS003.value}
                />
                <div className="text-gray-700 w-[20px] text-center self-center">~</div>
                <CalendarInput
                    placeholder="선택"
                    date={endDate as string|| null}
                    setDate={(date) => setEndDate(date)}
                    disabled={progressStatusCode === TASK_STATUS.PS003.value}
                />
            </div>
        </div>
    );
}

export default TaskDate;