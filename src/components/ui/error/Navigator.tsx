import React, {HTMLAttributes} from 'react';
import {classNames} from "@/utils/common";

type NavigatorProps = HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode
}

function Navigator({children, ...props}: NavigatorProps) {
    return (
        <div className={classNames('flex-col space-x-1', props.className ? props.className : '')}>
            {children}
        </div>
    );
}

export default Navigator;