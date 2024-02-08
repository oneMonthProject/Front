import React from 'react';
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";
import {BadgeProps, NoticeTypeKey} from "@/utils/type";

interface NoticeBadgeProps {
    size: string;
    text: NoticeTypeKey;
}
function NoticeBadge({size = '', text = 'WORK'}: NoticeBadgeProps) {
    // 사이즈
    const {textSize, px, py} = makeBadgeSize(size);

    let color;
    switch (text) {
        case 'WORK':
            color = 'green';
            break;
        case 'RECRUIT':
            color = 'yellow';
            break;
        case 'CREW':
        case 'ADD':
        case 'WITHDRAWL':
        case 'FORCEWITHDRAWL':
            color = 'blue';
            break;
        default:
            color = 'green';
            break;
    }

    const {bgColor, textColor, ringColor} = makeBadgeColor(color);

    return (
        <>
      <span
          className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset ${ringColor}`}
      >
        {text}
      </span>
        </>
    );
}

export default NoticeBadge;