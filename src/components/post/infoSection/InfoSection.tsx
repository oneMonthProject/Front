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
    <div className="py-10 mobile:py-4 px-2 grid gap-x-1 grid-cols-2 text-xl gap-y-6 auto-rows-auto mobile:text-sm mobile:grid-cols-1 mobile:gap-y-0">
      <div className="flex gap-5 h-10 items-center break-words">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">프로젝트 이름</div>
        <div className="w-[calc(100%-130px)] line-clamp-2">{projectName}</div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">시작 예정</div>
        <div className="w-[calc(100%-110px)]">{startDate}</div>
      </div>
      <div className="flex gap-5 h-10 items-center break-words">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">프로젝트 주제</div>
        <div className="w-[calc(100%-130px)] line-clamp-2">{subject}</div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">종료 예정</div>
        <div>{endDate}</div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">프로젝트 등급</div>
        <div>
          <TrustGradeBadge size="xs" text={trustGrade.name} />
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">사용 스택</div>
        <div className="flex gap-1 items-center">
          {technologyStacks.map(stack => (
            <div key={stack.techStackId.toString()} className="w-8 h-8 mobile:w-6 mobile:h-6">
              <TechStackImage stackName={stack.techStackName} width={40} height={40} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">모집 인원</div>
        <div>{crewNumber > 0 ? `${crewNumber}명` : "인원미정"}</div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">연락 방법</div>
        <div className="w-[calc(100%-130px)] line-clamp-1">{contact}</div>
      </div>
      <div className="flex gap-5 h-10 items-center">
        <div className="text-grey800 w-[110px] mobile:w-[80px] text-center whitespace-nowrap font-bold">모집 분야</div>
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
