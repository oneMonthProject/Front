import React from "react";
import Link from "next/link";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import TechStackImage from "@/components/ui/TechStackImage";
import Avatar from "@/components/ui/Avatar";
import { BsEyeFill } from "@react-icons/all-files/bs/BsEyeFill";
import { PostCardInfo } from "@/utils/type";

const PostCard = ({ postInfo }: { postInfo: PostCardInfo }) => {
  const { boardId, boardTitle, project, boardPositions, boardPageView, user } = postInfo;

  return (
    <div className="p-3 flex-col w-[280px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-2">
      <Link href={`/post?postId=${boardId}`}>
        <div className="flex">
          <div className="font-bold text-base mr-3">{project.name}</div>
          <TrustGradeBadge size="xs" text={project.trustGrade.name} />
        </div>
        <div className="mt-2 text-xs">
          {`${project.startDate} ~ ${project.endDate}`}
        </div>
        <div className="text-sm mt-2 font-bold text-grey800">
          {`주제 | ${project.subject}`}
        </div>
        <div className="text-xl font-bold mt-2">{boardTitle}</div>
        <div className="flex gap-1 mt-2">
          {boardPositions.length > 0 && boardPositions.map((boardPosition) => {
            const { positionId, name } = boardPosition.position;
            return <PositionBadge key={positionId.toString()} size="xs" text={name} />
          })}
        </div>
        <div className="flex gap-1 border-b-2 pb-4 mt-4">
          {project.technologyStacks.length > 0 && project.technologyStacks.map((stack) => (
            <TechStackImage key={stack.techStackId.toString()} stackName={stack.techStackName} width={40} height={40} />
          ))}
        </div>
        <div className="flex items-center mt-2 px-1 justify-between">
          <div className="flex">
            <Avatar size="2xs" alt="사용자" src={user.profileImgSrc} />
            <div className="ml-2 text-sm self-center">{user.nickname}</div>
          </div>
          <div className="flex">
            <BsEyeFill className="w-4 h-4 self-center text-grey500" />
            <div className="ml-2 text-base text-grey800">{boardPageView}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
