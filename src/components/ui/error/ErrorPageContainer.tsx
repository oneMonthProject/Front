import React, {HTMLAttributes} from 'react';
import {classNames} from "@/utils/common";

type ErrorPageContainerProps = HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode,
}

function ErrorPageContainer({children, ...props}: ErrorPageContainerProps) {
    return (
        <div className={classNames(
            "flex flex-col items-center justify-center min-h-[calc(100vh-100px)]",
            props.className ? props.className : ''
        )}>
            {children}
        </div>
    );
}

export default ErrorPageContainer;