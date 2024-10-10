import React from "react";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import TechStackImage from "@/components/ui/TechStackImage";
import {PostDetailPosition, ProjectInfoSummary} from "@/utils/type";

interface InfoProps {
  projectInfo: ProjectInfoSummary;
  contact: string;
  boardPositions: PostDetailPosition[];
}

const ProjectInfoSection = ({ projectInfo, contact, boardPositions }: InfoProps) => {
  const { projectName, projectSubject, startDate, endDate, technologyStacks } = projectInfo;

  return (
    <section className="pc:w-[90%] w-full h-[350px] mobile:h-[300px] flex flex-col justify-center">
      <h2 className='sr-only'>프로젝트 정보</h2>
      <article className="grid gap-x-1 grid-cols-2 gap-y-8 auto-rows-auto mobile:grid-cols-1 mobile:gap-y-0 mobile:text-sm ">
        <article className="flex gap-5 h-10 items-center break-words">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">프로젝트 이름</h3>
          <p className="w-[calc(100%-130px)] line-clamp-2">{projectName}</p>
        </article>
        <article className="flex gap-5 h-10 items-center">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">시작 예정</h3>
          <p className="w-[calc(100%-110px)]">{startDate}</p>
        </article>
        <article className="flex gap-5 h-10 items-center break-words">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">프로젝트 주제</h3>
          <p className="w-[calc(100%-130px)] line-clamp-2">{projectSubject}</p>
        </article>
        <article className="flex gap-5 h-10 items-center">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">종료 예정</h3>
          <p>{endDate}</p>
        </article>
        <article className="flex gap-5 h-10 items-center">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">사용 스택</h3>
          <ul className="flex gap-1 w-[calc(100%-130px)] overflow-auto">
            {technologyStacks.map(stack => (
              <TechStackImage key={stack.techStackId.toString()} stackName={stack.techStackName} width={32} height={32} />
            ))}
          </ul>
        </article>
        <article className="flex gap-5 h-10 items-center">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">연락 방법</h3>
          <div className="w-[calc(100%-130px)] line-clamp-1">{contact}</div>
        </article>
        <article className="flex gap-5 h-10 items-center">
          <h3 className="text-grey800 w-[110px] mobile:w-[80px] text-center text-xl mobile:text-sm whitespace-nowrap font-bold">모집 분야</h3>
          <ul className="flex w-[calc(100%-130px)] gap-1 items-center overflow-auto">
            {boardPositions.length > 0 && boardPositions.map(boardPosition => {
              const { positionId, name } = boardPosition.position;
              return <PositionBadge key={positionId.toString()} size="xs" text={name} />
            })}
          </ul>
        </article>
      </article>
    </section>
  );
};

export default ProjectInfoSection;
