import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import TechStackImage from "@/components/ui/TechStackImage";
import Avatar from "@/components/ui/Avatar";
import { BsEyeFill } from "@react-icons/all-files/bs/BsEyeFill";
import { PostInfo } from "@/utils/type";

interface PostCardProps {
  postInfo: PostInfo;
}

const PostCard = ({
  postInfo: {
    id,
    title,
    projectName,
    projectSubject,
    trustGrade,
    startDate,
    endDate,
    positions,
    techStacks,
    userInfo
  }
}: PostCardProps) => {
  return (
    <Link href={`/post/${id}`}>
      <div className="p-3 flex-col w-[280px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-2">
        <div className="flex">
          <div className="font-bold text-base mr-3">{projectName}</div>
          <TrustGradeBadge size="xs" text={trustGrade} color="red" />
        </div>
        <div className="mt-2 text-xs">
          {`${format(startDate, "yyyy.MM.dd")} ~ ${format(endDate, "yyyy.MM.dd")}`}
        </div>
        <div className="text-sm mt-2 font-bold text-grey800">
          {`주제 | ${projectSubject}`}
        </div>
        <div className="text-xl font-bold mt-2">{title}</div>
        <div className="flex gap-1 mt-2">
          {positions.length > 0 && positions.map((position) => (
            <PositionBadge key={position.value} size="xs" text={position.name} />
          ))}
        </div>
        <div className="flex gap-1 border-b-2 pb-4 mt-4">
          {techStacks.length > 0 && techStacks.map((stack) => (
            <TechStackImage key={stack.value} stackName={stack.name} width={40} height={40} />
          ))}
        </div>
        <div className="flex items-center mt-2 px-1 justify-between">
          <div className="flex">
            <Avatar size="2xs" alt="사용자" src={userInfo.imageSrc} />
            <div className="ml-2 text-sm self-center">{userInfo.nickname}</div>
          </div>
          <div className="flex">
            <BsEyeFill className="w-4 h-4 self-center text-grey500" />
            <div className="ml-2 text-base text-grey800">20</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
