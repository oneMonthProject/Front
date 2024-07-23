import React from 'react';
import AvatarSkeleton from "@/components/ui/skeleton/AvatarSkeleton";
import Skeleton from "@/components/ui/skeleton/Skeleton";

function UserMenuSkeleton() {
    return (
        <ul className='flex items-center'>
            <li className='mx-2'>
                <Skeleton sizeClassName="w-[110px] h-[26px] mobile:w-[60px]"/>
            </li>
        </ul>
    );
}

export default UserMenuSkeleton;