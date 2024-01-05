import React from "react";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import TechStackImage from "@/components/ui/TechStackImage";
import { PostDetailPosition, ProjectInfo } from "@/utils/type";

interface InfoProps {
  projectInfo: ProjectInfo;
  contact: string;
  boardPositions: PostDetailPosition[];
}

const InfoSection = ({ projectInfo, contact, boardPositions }: InfoProps) => {
  const { name: projectName, subject, trustGrade, startDate, endDate, crewNumber, technologyStacks } = projectInfo;

  return (
    <div className="py-10 mobile:py-4 px-2 grid gap-x-1 grid-cols-2 text-xl font-bold gap-y-6 auto-rows-auto mobile:text-sm mobile:grid-cols-1 mobile:gap-y-0">
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">프로젝트 이름</span>
        <span>{projectName}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">시작 예정</span>
        <span>{startDate}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap w-[110px] mobile:w-[80px] text-center">프로젝트 주제</span>
        <span>{subject}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">종료 예정</span>
        <span>{endDate}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">프로젝트 등급</span>
        <div>
          <TrustGradeBadge size="xs" text={trustGrade.name} />
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap w-[110px] mobile:w-[80px] text-center">사용 스택</span>
        <div className="flex gap-1 items-center">
          {technologyStacks.map(stack => (
            <div key={stack.techStackId.toString()} className="w-8 h-8 mobile:w-6 mobile:h-6">
              <TechStackImage stackName={stack.techStackName} width={40} height={40} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">모집 인원</span>
        <span>{crewNumber > 0 ? `${crewNumber}명` : "인원미정"}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 whitespace-nowrap w-[110px] mobile:w-[80px] text-center">연락 방법</span>
        <span>{contact}</span>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <span className="text-grey800 w-[110px] mobile:w-[80px] text-center">모집 분야</span>
        <div className="flex gap-1 items-center">
          {boardPositions.length > 0 && boardPositions.map(boardPosition => {
            const { positionId, name } = boardPosition.position;
            return <PositionBadge key={positionId.toString()} size="xs" text={name} />
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
