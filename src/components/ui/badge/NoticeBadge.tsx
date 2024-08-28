import React from 'react';
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";
import {AlertMenu} from "@/service/project/alert/type";

interface NoticeBadgeProps {
    size: string;
    noticeType: AlertMenu
}

function NoticeBadge({size = '', noticeType}: NoticeBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    let color;
    switch (noticeType.name) {
        case "크루":
            color = "blue";
            break;
        case "강제탈퇴":
            color = "red";
            break;
        case "모집":
            color = "yellow";
            break;
        default:
            color = "yellow";
    }

    const {bgColor, textColor, ringColor} = makeBadgeColor(color);

    return (
        <>
      <span
          className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}
      >
        {noticeType.name}
      </span>
        </>
    );
}

export default NoticeBadge;