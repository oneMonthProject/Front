import React from 'react';
import {makeBadgeSize} from "@/utils/common";
import {BadgeProps} from "@/utils/type";

function ProjectRoleBadge({size = '', text = ''}: BadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const bgColor = text === '매니저' ? 'bg-[#FF513A]' : 'bg-[#FFF9CF]';
    const textColor = text === '매니저' ? 'text-[#FFFFFF]' : 'text[#7B5C03]';

    return (
        <span
            className={`inline-flex items-center rounded-full ${bgColor} ${textColor} font-medium ${textSize} ${px} ${py}`}>
            {text}
        </span>
    );
}

export default ProjectRoleBadge;