import React from 'react';
import {makeBadgeColor, makeBadgeSize} from "@/utils/common";

function NoticeBadge({size = '', text = ''}: BadgeProps) {
    // 사이즈
    const {textSize, px, py} = makeBadgeSize(size);

    let color;
    switch (text) {
        case '업무':
            color = 'green';
            break;
        case '모집':
            color = 'blue';
            break;
        case '크루':
            color = 'purple';
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