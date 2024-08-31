import React, {useEffect, useState} from 'react';
import {ReactDatePickerProps} from "react-datepicker";
import CalendarInput from "@/components/ui/form/CalendarInput";
import {addDays, format, subDays} from "date-fns";
import _ from "lodash";

type CustomDateRangePickerProps = {
    startDate: string | null;
    endDate: string | null;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
};

function DateRangePicker({
                             startDate,
                             endDate,
                             setStartDate,
                             setEndDate
                         }: CustomDateRangePickerProps) {
    const [endMinDate, setEndMinDate] = useState<Date | null>(() =>
        addDays(startDate ? new Date(startDate) : new Date(), 1));

    console.log("endMinDate: ", endMinDate);

    // 시작날짜보다 종료날짜 앞서지 못하도록
    useEffect(() => {
        if (startDate) {
            const startDateNum = parseInt(startDate.replaceAll("-", ""), 10);
            if (
                endDate == null
                || parseInt(endDate.replaceAll("-", ""), 10) <= startDateNum
            ) {
                const initEndDate = addDays(new Date(startDate), 1);
                setEndMinDate(initEndDate);
                setEndDate(format(initEndDate, 'yyyy-MM-dd'));
            }
        }
    }, [startDate, endDate, setEndDate]);


    return (
        <div className='w-[350px] mobile:w-[220px] ml-auto flex space-x-1'>
            <CalendarInput
                id="startDate"
                placeholder="시작 날짜 선택"
                date={startDate}
                setDate={(value) => setStartDate(value)}
            />
            <div className="text-gray-700 w-[20px] text-center self-center">~</div>
            <CalendarInput
                id="endDate"
                placeholder="종료 날짜 선택"
                date={endDate}
                setDate={(value) => setEndDate(value)}
                minDate={endMinDate}
            />
        </div>
    );
}

export default DateRangePicker;