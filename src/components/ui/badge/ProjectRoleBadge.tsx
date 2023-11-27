import React from 'react';
import {makeBadgeSize} from "@/utils/common";
import {BadgeProps} from "@/utils/type";

function ProjectRoleBadge({size = '', text = ''}: BadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const bgColor = text === '매니저' ? '#FF513A' : '#FFF9CF';
    const textColor = text === '매니저' ? '#FFFFFF' : '#7B5C03';

    if(text === '구성원') return null;
    return (
        <span
            className={`inline-flex items-center rounded-full bg-[${bgColor}] text-[${textColor}] font-medium ${textSize} ${px} ${py}`}>
            {text}
        </span>
    );
}

export default ProjectRoleBadge;