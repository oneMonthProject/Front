import React from "react";
import TrustGradeBadge from "../../ui/badge/TrustGradeBadge";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";

const ProjectCard = () => {
  return (
    <div className="p-3 flex-col w-[280px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-2">
      <div className="flex">
        <div className="font-bold text-base mr-3">trustcrews</div>
        <TrustGradeBadge size="xs" text="1등급" />
      </div>
      <div className="flex mt-2">
        <div className="text-xs">2023.12.05 ~ </div>
        <div className="ml-2 text-xs">2023.01.10</div>
      </div>
      <div className="text-xl font-bold mt-2">
        팀 프로젝트 매칭 서비스 개발
      </div>
      <div className="flex -space-x-3 overflow-hidden mt-5">
        <Avatar
          size="xs"
          alt=""
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Avatar
          size="xs"
          alt=""
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Avatar
          size="xs"
          alt=""
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
        <Avatar
          size="xs"
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
      </div>
      <div className="flex mt-6">
        <Image src="/images/update.svg" alt="" width={15} height={15} />
        <div className="font-bold text-grey800 ml-2 text-sm">업데이트</div>
      </div>
    </div>
  );
};

export default ProjectCard;
