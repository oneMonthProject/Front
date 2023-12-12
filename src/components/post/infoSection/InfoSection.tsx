import React from "react";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import TechStackImage from "@/components/ui/TechStackImage";
import { format } from "date-fns";

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

const testItem = {
  projectName: "trustcrews",
  projectSubject: "팀프로젝트 매칭 서비스 개발",
  trustGrade: "1등급",
  recruitmentCount: 5,
  startDate: new Date("2023-12-05"),
  endDate: new Date("2023-01-05"),
  positions: [positionList[0], positionList[1]],
  techStacks: [techStackList[0], techStackList[1], techStackList[3], techStackList[5]],
  contact: "010-XXXX-XXXX"
}

const InfoSection = () => {
  return (
    <div className="py-10 mobile:py-4 px-2 grid gap-x-1 grid-cols-2 text-xl font-bold gap-y-6 auto-rows-auto mobile:text-sm mobile:grid-cols-1 mobile:gap-y-0">
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">프로젝트 이름</span>
        <span>{testItem.projectName}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">시작 예정</span>
        <span>{format(testItem.startDate, "yyyy.MM.dd")}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap w-[110px] mobile:w-[80px] text-center">프로젝트 주제</span>
        <span>{testItem.projectSubject}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">종료 예정</span>
        <span>{format(testItem.endDate, "yyyy.MM.dd")}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">프로젝트 등급</span>
        <div>
          <TrustGradeBadge size="xs" text={testItem.trustGrade} />
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap w-[110px] mobile:w-[80px] text-center">사용 스택</span>
        <div className="flex gap-1 items-center">
          {testItem.techStacks.length > 0 && testItem.techStacks.map(stack => (
            <div key={stack.name} className="w-8 h-8 mobile:w-6 mobile:h-6">
              <TechStackImage stackName={stack.name} width={40} height={40} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">모집 인원</span>
        <span>{`${testItem.recruitmentCount}명`}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap w-[110px] mobile:w-[80px] text-center">연락 방법</span>
        <span>{testItem.contact}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">모집 분야</span>
        <div className="flex gap-1 items-center">
          {testItem.positions.length > 0 && testItem.positions.map(position => (
            <PositionBadge key={position.name} size="xs" text={position.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
