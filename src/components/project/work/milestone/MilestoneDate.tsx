import React, {useCallback, useEffect} from 'react';
import DateRangePicker from "@/components/ui/datepicker/DateRangePicker";
import {useRecoilState} from "recoil";
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {addDays, format} from "date-fns";

function MilestoneDate() {
    const [currentForm, setCurrentForm] = useRecoilState(milestoneModalFormState);

    const onDateChange = useCallback((date: string, target: 'startDate' | 'endDate') => {
        if (currentForm) {
            const updatedForm = {...currentForm, [target]: date};
            setCurrentForm(updatedForm);
        }
    },[currentForm, setCurrentForm])

    // 시작/종료날짜 초기화
    useEffect(() => {
        if (!currentForm?.startDate) {
            onDateChange(format(new Date(),'yyyy-MM-dd'), 'startDate');
        }

        if (!currentForm?.endDate) {
            onDateChange(format(addDays(new Date(), 1), 'yyyy-MM-dd'), 'endDate');
        }
    }, [currentForm?.startDate, currentForm?.endDate, onDateChange]);

    return (
        <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">기간</label>
            <DateRangePicker
                startDate={currentForm?.startDate || null}
                endDate={currentForm?.endDate || null}
                setStartDate={(date) => onDateChange(date, "startDate")}
                setEndDate={(date) => onDateChange(date, "endDate")}
            />
        </div>
    );
}

export default MilestoneDate;