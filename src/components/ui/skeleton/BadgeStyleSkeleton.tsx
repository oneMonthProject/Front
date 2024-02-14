import React, {HTMLAttributes} from 'react';
import {classNames, makeBadgeSize} from "@/utils/common";
import {BadgeProps} from "@/utils/type";

interface BadgeStyleSkeletonProps extends HTMLAttributes<HTMLDivElement> {
    size?: string;
    text?: string;
}

function BadgeStyleSkeleton({size = 'md', text = '시작전', ...props}: BadgeStyleSkeletonProps) {
    const {textSize, py, px} = makeBadgeSize(size);
    return (
        <div
            className={classNames(props.className || '',
                `${textSize} ${py} ${px} bg-gray-200 rounded-full animate-pulse text-transparent`)}>
            {text}
        </div>
    );
}

export default BadgeStyleSkeleton;