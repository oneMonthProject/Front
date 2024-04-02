import React from 'react';
import {getStatusBadgeColor, makeBadgeSize} from "@/utils/common";
import {BadgeProps} from "@/utils/type";

interface ProjectApplyStatusBadgeProps extends BadgeProps {
    status: boolean | null;
}

function ProjectApplyStatusBadge({status, size = ''}: ProjectApplyStatusBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    let text = '미확인';
    if(status === true) text = '수락';
    if(status === false) text = '거절';
    if(status === null) text = '미확인';

    const {bgColor, textColor} = getStatusBadgeColor(text);

    return (
        <span
            className={`mr-2 inline-flex items-center rounded-md ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset`}
            aria-hidden={true}
        >
            <p className='sr-only'>{text}</p>
            {text}
      </span>
    );
}

export default ProjectApplyStatusBadge;