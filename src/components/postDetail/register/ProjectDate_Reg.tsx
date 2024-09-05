import React from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";

function ProjectDate_Reg() {
    const [{startDate}, setStartDate] = useRecoilState(projectFieldSelector('startDate'));
    const [{endDate}, setEndDate] = useRecoilState(projectFieldSelector('endDate'));

    return (
        <div className="w-[380px] tablet:w-full space-y-10 mobile:mx-auto">
            <CalendarInput
                id="startDate"
                label="시작 날짜"
                placeholder="날짜를 선택해주세요."
                date={startDate}
                setDate={(value) => setStartDate({startDate:value})}
            />
            <CalendarInput
                id="endDate"
                label="종료 날짜"
                placeholder="날짜를 선택해주세요."
                date={endDate}
                setDate={(value) => setEndDate({endDate:value})}
            />
        </div>
    );
}

export default ProjectDate_Reg;