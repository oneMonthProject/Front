import React from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    ProjectSettingInfoUpdField
} from "@/store/project/setting/ProjectSettingFormStateStore";
import {ProjectSettingInfoData} from "@/service/project/setting/info";


function ProjectDate({
                         initStartDate,
                         initEndDate
                     }: {
    initStartDate: ProjectSettingInfoData['startDate'],
    initEndDate: ProjectSettingInfoData['endDate']
}) {
    const [startDate, setStartDate] = useRecoilState(projectSettingInfoSelector('startDate'));
    const [endDate, setEndDate] = useRecoilState(projectSettingInfoSelector('endDate'));

    const startDateValue = startDate ? startDate as ProjectSettingInfoUpdField<'startDate'> : initStartDate;
    const endDateValue = endDate ? endDate as ProjectSettingInfoUpdField<'endDate'> : initEndDate;

    return (
        <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
            <CalendarInput
                id="startDate"
                label="시작 날짜"
                placeholder="날짜를 선택해주세요."
                date={startDateValue}
                setDate={(startDate) => setStartDate(startDate)}
            />
            <CalendarInput
                id="endDate"
                label="종료 날짜"
                placeholder="날짜를 선택해주세요."
                date={endDateValue}
                setDate={(endDate) => setEndDate(endDate)}
            />
        </div>
    );
}

export default ProjectDate;