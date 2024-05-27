import React from 'react';
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";
import {PROJECT_NOTICE, PROJECT_NOTICE_TYPES} from "@/app/project/@notice/_utils/constant";
import {ProjectNoticeTypesKey} from "@/app/project/@notice/_utils/type";

interface NoticeBadgeProps {
    size: string;
    noticeType: ProjectNoticeTypesKey
}

function NoticeBadge({size = '', noticeType}: NoticeBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const noticeGroupName = PROJECT_NOTICE_TYPES[noticeType]['group'];
    const color = PROJECT_NOTICE[noticeGroupName].color;

    const {bgColor, textColor, ringColor} = makeBadgeColor(color);

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