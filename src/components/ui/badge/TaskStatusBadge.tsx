import React from 'react';
import {BadgeProps} from "@/utils/type";
import {getStatusBadgeColor, makeBadgeSize} from "@/utils/common";



function TaskStatusBadge({size = '', text = '시작전'}: BadgeProps) {

    const {textSize, px, py} = makeBadgeSize(size);

    const {bgColor, textColor} = getStatusBadgeColor(text);


    return (
        <span
            className={`inline-flex items-center rounded-full ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor}`}
        >
        {text}
      </span>
    );
}

export default TaskStatusBadge;