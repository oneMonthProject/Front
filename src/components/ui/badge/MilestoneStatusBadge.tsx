import React from 'react';
import {BadgeProps} from "@/utils/type";
import {getStatusBadgeColor, makeBadgeSize} from "@/utils/common";

// 상태 - 시작전, 진행중, 완료, 만료
function MilestoneStatusBadge({size = '', text = '시작전'}: BadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const {bgColor, textColor} = getStatusBadgeColor(text);

    return (
        <span
            className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor}`}
            aria-hidden={true}
        >
            <p className='sr-only'>{text}</p>
        {text}
      </span>
    );
}

export default MilestoneStatusBadge;