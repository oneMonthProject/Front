'use client';
import React from 'react';
import {makeBadgeSize} from "@/utils/common";

interface ProjectAuthBadgeProps {
    size: string;
    text: string;
}

function ProjectAuthBadge({size, text}: ProjectAuthBadgeProps) {
    const bgColor = text === "매니저" ? 'bg-[#FF513A]' : 'bg-[#FFF9CF]';
    const textColor = text === "매니저" ? 'text-[#FFFFFF]' : 'text-[#7B5C03]';
    const {textSize, px, py} = makeBadgeSize(size);

    return (
        <span
            className={`rounded-full ${bgColor} ${textColor} ${textSize} ${px} ${py}`}>{text}</span>
    );
}

export default ProjectAuthBadge;