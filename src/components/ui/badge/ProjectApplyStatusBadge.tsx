import React from 'react';
import {getStatusBadgeColor, makeBadgeSize} from "@/utils/common";
import {BadgeProps, ConstantDto, StatusCode} from "@/utils/type";
import {ProjectApplyStatusCode} from "@/service/project/apply";

interface ProjectApplyStatusBadgeProps extends BadgeProps {
    status: ConstantDto<ProjectApplyStatusCode>;
}

function ProjectApplyStatusBadge({status, size = ''}: ProjectApplyStatusBadgeProps) {
    const {textSize, px, py} = makeBadgeSize(size);
    const {bgColor, textColor} = getStatusBadgeColor(status.code);

    return (
        <span
            className={`mr-2 inline-flex items-center rounded-md ${bgColor} ${px} ${py} ${textSize} font-medium ${textColor} ring-1 ring-inset`}
            aria-hidden={true}
        >
            <p className='sr-only'>{status.name}</p>
            {status.name}
      </span>
    );
}

export default ProjectApplyStatusBadge;