import React from 'react';
import AvatarSkeleton from "@/components/ui/skeleton/AvatarSkeleton";
import Skeleton from "@/components/ui/skeleton/Skeleton";

function UserMenuSkeleton() {
    return (
        <div className='flex space-x-1'>
            <AvatarSkeleton size="2xs" className='mobile:hidden'/>
            <Skeleton sizeClassName="w-[110px] h-[24px] mobile:w-[60px]"/>
        </div>
    );
}

export default UserMenuSkeleton;