import React from 'react';

function Skeleton({sizeClassName}:{sizeClassName:string}) {
    return (
        <div className={`${sizeClassName} bg-gray-200 animate-pulse rounded-2xl`}></div>
    );
}

export default Skeleton;