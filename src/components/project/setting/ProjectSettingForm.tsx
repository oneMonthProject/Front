'use client';
import React, {useState} from "react";
import Button from "@/components/ui/Button";
import CalendarInput from "@/components/ui/form/CalendarInput";
import Input from "@/components/ui/form/Input";
import {SelectItem, TrustGradeNameType} from "@/utils/type";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import TrustGradeSelect from "@/components/post/register/TrustGradeSelect";
import {createTrustGradeSelectItem} from "@/utils/common";


export default function ProjectSetting() {

    const {
        projectId,
        name: initProjectName,
        startDate: initStartDate,
        endDate: initEndDate,
        trustGrade: {name: initTrustGrade},
        status: initStatus,
        subject: initSubject
    } = useProjectInfo();

    const [projectName, setProjectName] = useState(() => initProjectName);
    const [projectSubject, setProjectSubject] = useState(() => initSubject);
    const [trustGrade, setTrustGrade] = useState<SelectItem | null>(() => createTrustGradeSelectItem(initTrustGrade as TrustGradeNameType));
    const [startDate, setStartDate] = useState<string | null>(() => initStartDate);
    const [endDate, setEndDate] = useState<string | null>(() => initEndDate);

    const initProjectInfo = () => {
        setProjectName(initProjectName);
        setProjectSubject(initSubject);
        setTrustGrade(createTrustGradeSelectItem(initTrustGrade as TrustGradeNameType));
        setStartDate(initStartDate);
        setEndDate(initEndDate);
    }


    const saveProjectInfo = () => {

    }

    const endProject = () => {

    }

    return (
        <div className="space-y-6 px-8 mobile:px-4">
            <div className="space-y-6">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 정보 설정</div>
                <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3 px-3 mobile:px-0">
                    <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                        <Input id="projectName" label="프로젝트 이름" placeholder="이름을 입력해주세요."
                               value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                        <Input id="projectSubject" label="프로젝트 주제" placeholder="주제를 입력해주세요."
                               value={projectSubject} onChange={(e) => setProjectSubject(e.target.value)}/>
                        <TrustGradeSelect trustGrade={trustGrade}
                                          setTrustGrade={(item: SelectItem) => setTrustGrade(item)}/>
                    </div>
                    <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                        <CalendarInput id="startDate" label="시작 날짜" placeholder="날짜를 선택해주세요."
                                       date={startDate} setDate={setStartDate}/>
                        <CalendarInput id="endDate" label="종료 날짜" placeholder="날짜를 선택해주세요."
                                       date={endDate} setDate={setEndDate}/>
                    </div>
                </div>
                <div className="text-end space-x-2 px-3 mobile:px-0">
                    <Button theme="primary-hollow" size="md" onClickHandler={initProjectInfo}>초기화</Button>
                    <Button size="md" onClickHandler={saveProjectInfo}>저장</Button>
                </div>
            </div>
            <div className="space-y-3">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 상태 설정</div>
                <div className="flex mobile:flex-col px-3 mobile:px-0">
                    <div className="self-center mobile:text-sm">프로젝트 종료 후 다시 상태를 변경할 수 없습니다.</div>
                    <div className="ml-auto mobile:mt-2">
                        <Button theme='black' size='md' onClickHandler={endProject}>프로젝트 종료</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}