import React from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState} from "recoil";
import {taskModalFieldSelector} from "@/store/project/task/TaskStateStore";

function TaskDate() {
    const [startDate, setStartDate] = useRecoilState(taskModalFieldSelector('startDate'));
    const [endDate, setEndDate] = useRecoilState(taskModalFieldSelector('endDate'));

    return (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">기간</label>
            <div className='flex w-[350px] mobile:w-[220px] ml-auto'>
                <CalendarInput placeholder="선택" date={startDate as string|| null}
                               setDate={(date) => setStartDate(date)}/>
                <div className="text-gray-700 w-[20px] text-center self-center">~</div>
                <CalendarInput placeholder="선택" date={endDate as string|| null}
                               setDate={(date) => setEndDate(date)}/>
            </div>
        </div>
    );
}

export default TaskDate;