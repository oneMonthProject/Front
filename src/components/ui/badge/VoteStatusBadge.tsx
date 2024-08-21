import React from 'react';
import {VoteStatusType} from "@/service/project/alert/type";
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";

type VoteStatusBadgeProps = {
    voteStatus: VoteStatusType,
    size: string;
}

function VoteStatusBadge({voteStatus, size = ""}: VoteStatusBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const bgColor = "transparent";
    const color = voteStatus.name === "투표중" ? "green" : "slate";
    const {textColor, ringColor} = makeBadgeColor(color);

    return (
        <>
      <span
          className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}
      >
        {voteStatus.name}
      </span>
        </>
    );
}

export default VoteStatusBadge;