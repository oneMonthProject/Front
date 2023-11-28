'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/TextArea";
import CalendarInput from "@/components/ui/form/CalendarInput";
import { SelectItem } from "@/utils/type";

const gradeList = [
  { value: 1, name: '1등급' },
  { value: 2, name: '2등급' },
  { value: 3, name: '3등급' },
  { value: 4, name: '4등급' },
  { value: 5, name: '5등급' }
];

const recruitmentCountList = [
  { value: 0, name: '인원 미정' },
  { value: 1, name: '1명' },
  { value: 2, name: '2명' },
  { value: 3, name: '3명' },
  { value: 4, name: '4명' },
  { value: 5, name: '5명' },
  { value: 6, name: '6명' },
  { value: 7, name: '7명' },
  { value: 8, name: '8명' },
  { value: 9, name: '9명' },
  { value: 10, name: '10명' },
];

const positionList = [
  { value: 1, name: '프론트엔드' },
  { value: 2, name: '백엔드' },
  { value: 3, name: '디자이너' },
  { value: 4, name: 'IOS' },
  { value: 5, name: '안드로이드' },
  { value: 6, name: '데브옵스' }
];

const techStackList = [
  { value: 1, name: 'React' },
  { value: 2, name: 'TypeScript' },
  { value: 3, name: 'JavaScript' },
  { value: 4, name: 'Vue' },
  { value: 5, name: 'Nextjs' },
  { value: 6, name: 'Node.js' },
  { value: 7, name: 'Java' },
  { value: 8, name: 'Spring' },
  { value: 9, name: 'Kotlin' },
  { value: 10, name: 'Nestjs' },
  { value: 11, name: 'Swift' },
  { value: 12, name: 'Flutter' },
  { value: 13, name: 'Figma' },
];

function RegisterForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectSubject, setProjectSubject] = useState("");
  const [trustGrade, setTrustGrade] = useState<SelectItem | null>(null);
  const [recruitmentCount, setRecruitmentCount] = useState<SelectItem>(recruitmentCountList[0]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [position, setPosition] = useState<SelectItem | null>(null);
  const [techStack, setTechStack] = useState<SelectItem[]>([]);
  const [projectInfo, setProjectInfo] = useState("");
  const [contact, setContact] = useState("");

  const goHome = () => {
    router.push("/");
  }

  const registerPost = () => {

  }

  return (
    <div className="w-full max-w-[800px] mobile:max-w-[400px] mx-auto space-y-5 mobile:space-y-3 my-4 mobile:my-3">
      <div className="w-full mobile:w-[300px] mx-auto">
        <div className="flex items-center border-b-2 border-grey600 py-2 mobile:py-0">
          <input type="text" placeholder="제목을 입력해주세요." aria-label="title" value={title} onChange={e => setTitle(e.target.value)}
            className="appearance-none bg-transparent border-none w-full placeholder-grey600 font-semibold text-2xl mobile:text-lg border text-grey600 mr-3 py-1 px-2 leading-tight focus:border-transparent focus:outline-none focus:ring-transparent" />
        </div>
      </div>
      <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3">
        <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
          <Input id="projectName" label="프로젝트 이름" placeholder="이름을 입력해주세요."
            value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          <Input id="projectSubject" label="프로젝트 주제" placeholder="주제를 입력해주세요."
            value={projectSubject} onChange={(e) => setProjectSubject(e.target.value)} />
          <Select value={trustGrade} setValue={setTrustGrade} items={gradeList} label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요." />
          <Select value={recruitmentCount} setValue={setRecruitmentCount} items={recruitmentCountList} label="모집 인원" placeholder="모집 인원을 선택해주세요." />
          <Select value={position} setValue={setPosition} items={positionList} label="모집 분야" placeholder="모집 분야를 선택해주세요." />
        </div>
        <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
          <CalendarInput id="startDate" label="시작 날짜" placeholder="날짜를 선택해주세요."
            date={startDate} setDate={setStartDate} />
          <CalendarInput id="startDate" label="종료 날짜" placeholder="날짜를 선택해주세요."
            date={endDate} setDate={setEndDate} />
          <MultiSelect values={techStack} setValues={setTechStack} items={techStackList} label="사용 스택" placeholder="사용 스택을 선택해주세요." />
          <Input id="contact" label="연락 방법" placeholder="오픈 카톡 링크 / 이메일 / 구글 폼 주소"
            value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
      </div>
      <div className="mobile:w-[300px] mx-auto">
        <TextArea id="information" label="프로젝트 소개" placeholder="프로젝트에 대해 소개해주세요." rows={10} cols={25}
          value={projectInfo} onChange={(e) => setProjectInfo(e.target.value)} />
      </div>
      <div className="mobile:w-[300px] space-x-1 text-right">
        <Button theme="primary-hollow" onClickHandler={goHome}>취소</Button>
        <Button onClickHandler={registerPost}>등록</Button>
      </div>
    </div>
  )
}

export default RegisterForm;