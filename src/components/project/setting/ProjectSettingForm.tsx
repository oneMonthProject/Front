'use client';
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import CalendarInput from "@/components/ui/form/CalendarInput";
import Input from "@/components/ui/form/Input";
import { SelectItem } from "@/utils/type";

const gradeList = [
  { value: 1, name: '1등급' },
  { value: 2, name: '2등급' },
  { value: 3, name: '3등급' },
  { value: 4, name: '4등급' },
  { value: 5, name: '5등급' }
];

const testProjectInfo = {
  id: 1,
  projectName: "trustcrews",
  projectSubject: "팀 프로젝트 매칭 서비스 개발",
  trustGrade: gradeList[0],
  startDate: new Date("2023-12-05"),
  endDate: new Date("2024-01-01")
}

export default function ProjectSetting() {
  const [projectName, setProjectName] = useState(testProjectInfo.projectName);
  const [projectSubject, setProjectSubject] = useState(testProjectInfo.projectSubject);
  const [trustGrade, setTrustGrade] = useState<SelectItem | null>(testProjectInfo.trustGrade);
  const [startDate, setStartDate] = useState<Date | null>(testProjectInfo.startDate);
  const [endDate, setEndDate] = useState<Date | null>(testProjectInfo.endDate);

  const initProjectInfo = () => {
    setProjectName(testProjectInfo.projectName);
    setProjectSubject(testProjectInfo.projectSubject);
    setTrustGrade(testProjectInfo.trustGrade);
    setStartDate(testProjectInfo.startDate);
    setEndDate(testProjectInfo.endDate);
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
              value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <Input id="projectSubject" label="프로젝트 주제" placeholder="주제를 입력해주세요."
              value={projectSubject} onChange={(e) => setProjectSubject(e.target.value)} />
            <Select value={trustGrade} setValue={setTrustGrade} items={gradeList} label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요." />
          </div>
          <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
            <CalendarInput id="startDate" label="시작 날짜" placeholder="날짜를 선택해주세요."
              date={startDate} setDate={setStartDate} />
            <CalendarInput id="endDate" label="종료 날짜" placeholder="날짜를 선택해주세요."
              date={endDate} setDate={setEndDate} />
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