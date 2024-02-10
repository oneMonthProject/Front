import React, {HTMLAttributes} from 'react';
import {classNames} from "@/utils/common";


function BadgeStyleSkeleton({...props}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={
                classNames(props.className || '',
                    ` bg-gray-200 rounded-full animate-pulse`)}>
        </div>
    );
}

export default BadgeStyleSkeleton;