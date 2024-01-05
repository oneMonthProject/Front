import React from 'react';
import {BadgeProps, CrewStatusKeys} from "@/utils/type";
import {getStatusBadgeColor, makeBadgeSize} from "@/utils/common";
import {CREW_STATUS} from "@/utils/constant";

interface CrewStatusBadgeProps extends BadgeProps {
    status: CrewStatusKeys;
}

function CrewStatusBadge({status, size = ''}: CrewStatusBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);

    const text = CREW_STATUS[status];
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

export default CrewStatusBadge;