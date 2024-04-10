import React from 'react';
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";
import {PROJECT_NOTICE_TYPE} from "@/app/project/@notice/_utils/constant";
import {ProjectNoticeTypeKey} from "@/app/project/@notice/_utils/type";

interface NoticeBadgeProps {
    size: string;
    noticeType: ProjectNoticeTypeKey;
}
function NoticeBadge({size = '', noticeType = 'WORK'}: NoticeBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const {bgColor, textColor, ringColor} = makeBadgeColor(PROJECT_NOTICE_TYPE[noticeType].color);

    return (
        <>
      <span
          className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}
      >
        {noticeType}
      </span>
        </>
    );
}

export default NoticeBadge;