import { makeImageSize } from '@/utils/common';
import React from 'react';

function AvatarSkeleton({size}:{size:string}) {
    const imageSize = makeImageSize(size);
    return (
        <div className={`${imageSize} bg-gray-300 rounded-full animate-pulse`}>
        </div>
    );
}

export default AvatarSkeleton;