import React, {useEffect, useState} from 'react';
import {ReactDatePickerProps} from "react-datepicker";
import CalendarInput from "@/components/ui/form/CalendarInput";
import {addDays, format, subDays} from "date-fns";
import _ from "lodash";

export type CustomDateRangePickerProps = {
    startDate: string | null;
    endDate: string | null;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    includeDateIntervals?: Array<{ start: Date; end: Date }> | undefined;
    startOpenToDate?: Date | undefined;
    endOpenToDate?: Date | undefined;
};

function DateRangePicker({
                             startDate,
                             endDate,
                             setStartDate,
                             setEndDate,
                             includeDateIntervals,
                             startOpenToDate,
                             endOpenToDate
                         }: CustomDateRangePickerProps) {
    const [endMinDate, setEndMinDate] = useState<Date | null>(() =>
        addDays(startDate ? new Date(startDate) : new Date(), 1));

    // 시작날짜보다 종료날짜 앞서지 못하도록
    useEffect(() => {
        if (startDate) {
            const initEndDate = addDays(new Date(startDate), 1);
            const startDateNum = parseInt(startDate.replaceAll("-", ""), 10);
            const endDateNum =
                endDate
                    ? parseInt(endDate.replaceAll("-", ""), 10)
                    : parseInt(format(addDays(new Date(), 1), 'yyyyMMdd'), 10);

            if (endDateNum <= startDateNum) {
                setEndDate(format(initEndDate, 'yyyy-MM-dd'));
            }
            setEndMinDate(initEndDate);
        }

    }, [startDate, endDate, setEndDate]);


    return (
        <div className='w-[350px] mobile:w-[220px] ml-auto flex space-x-1'>
            <CalendarInput
                id="startDate"
                placeholder="시작 날짜 선택"
                date={startDate}
                setDate={(value) => setStartDate(value)}
                includeDateIntervals={includeDateIntervals}
                openToDate={startOpenToDate}
            />
            <div className="text-gray-700 w-[20px] text-center self-center">~</div>
            <CalendarInput
                id="endDate"
                placeholder="종료 날짜 선택"
                date={endDate}
                setDate={(value) => setEndDate(value)}
                minDate={endMinDate}
                includeDateIntervals={includeDateIntervals}
                openToDate={endOpenToDate}
            />
        </div>
    );
}

export default DateRangePicker;