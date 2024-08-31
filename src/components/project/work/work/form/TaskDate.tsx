import React from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState, useRecoilValue} from "recoil";
import {taskModalFieldSelector, taskProgressModFieldSelector} from "@/store/project/task/TaskStateStore";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";
import useMilestone from "@/hooks/useMilestone";
import {bigIntToString} from "@/utils/common";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import {divide} from "lodash";
import DateRangePicker from "@/components/ui/datepicker/DateRangePicker";
import {addDays, format, subDays} from "date-fns";

function TaskDate({milestoneId}: { milestoneId: bigint }) {
    const {milestoneInfo, isFetching} = useMilestone(bigIntToString(milestoneId));
    const [startDate, setStartDate] = useRecoilState(taskModalFieldSelector('startDate'));
    const [endDate, setEndDate] = useRecoilState(taskModalFieldSelector('endDate'));

    if (isFetching) return <div className='flex'>
        <label className="text-gray-700 font-semibold self-center">기간</label>
        <div className='w-[350px] mobile:w-[220px] ml-auto flex space-x-1'>
            <Skeleton className='w-full h-[40px]'/>
            <div className="text-gray-700 w-[20px] text-center self-center">~</div>
            <Skeleton className='w-full h-[40px]'/>
        </div>
    </div>

    const {startDate: intervalStartDate, endDate: intervalEndDate} = milestoneInfo!;
    const includeDateIntervals = [{
        start: subDays(new Date(intervalStartDate), 1),
        end: new Date(intervalEndDate)
    }];

    return (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">기간</label>
            <DateRangePicker
                startDate={startDate as string || intervalStartDate}
                endDate={endDate as string || format(addDays(new Date(intervalStartDate), 1), 'yyyy-MM-dd')}
                setStartDate={(date) => setStartDate(date)}
                setEndDate={(date) => setEndDate(date)}
                includeDateIntervals={includeDateIntervals}
                startOpenToDate={new Date(intervalStartDate)}
            />
        </div>
    );
}

export default TaskDate;