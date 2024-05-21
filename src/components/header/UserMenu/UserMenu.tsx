'use client';
import React from 'react';
import {useMediaQuery} from "react-responsive";
import {ResponseBody, UserBasicInfo} from "@/utils/type";
import {useQuery} from '@tanstack/react-query';
import Avatar from '@/components/ui/Avatar';
import {getSimpleUser} from '@/service/user/user';
import UserMenuDropdown from "@/components/header/UserMenu/UserMenuDropdown";
import AvatarSkeleton from "@/components/ui/skeleton/AvatarSkeleton";
import Skeleton from "@/components/ui/skeleton/Skeleton";


function UserMenu() {
    const isDesktop = useMediaQuery({query: '(min-width: 376px)'});
    const {data, isFetching, isError} = useQuery<ResponseBody<UserBasicInfo>, Error>(
        {
            queryKey: ['simpleUserInfo'],
            queryFn: getSimpleUser
        }
    );

    if (isFetching) return (
        <div className='flex space-x-1'>
            <AvatarSkeleton size="2xs" className='mobile:hidden'/>
            <Skeleton sizeClassName="w-[110px] h-[24px] mobile:w-[60px]"/>
        </div>
    );

    const {nickname, profileImgSrc} = data!.data;


    return (
        <ul className='flex items-center'>
            <li className='flex items-center mx-2'>
                <Avatar size="2xs" alt="사용자" src={profileImgSrc}/>
                {
                    isDesktop && <span className='pl-2 text-grey90'>{nickname}</span>
                }
            </li>
            <li className='flex items-center tablet:p-1 mr-2'>
                <UserMenuDropdown/>
            </li>
        </ul>
    );
}

export default UserMenu;