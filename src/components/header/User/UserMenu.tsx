'use client';
import React from 'react';
import {useMediaQuery} from "react-responsive";
import {ResponseBody, UserBasicInfo} from "@/utils/type";
import Avatar from '@/components/ui/Avatar';
import UserMenuDropdown from "@/components/header/User/UserMenuDropdown";
import {useQuery} from "@tanstack/react-query";
import {getSimpleUser} from "@/service/user/user";
import UserMenuSkeleton from "@/components/ui/skeleton/header/UserMenuSkeleton";
import RegisterNav from "@/components/header/RegisterNav";


function UserMenu() {
    const isDesktop = useMediaQuery({query: '(min-width: 1280px)'});
    const {data, isLoading} = useQuery<ResponseBody<UserBasicInfo>, Error>(
        {
            queryKey: ['simpleUserInfo'],
            queryFn: getSimpleUser,
            staleTime: 0,
            // retry: false
        }
    );

    if (isLoading || (!isLoading && !(data?.data))) return <UserMenuSkeleton/>;

    const userBasicInfo = data?.data;

    const {nickname, profileImgSrc} = userBasicInfo!;

    return (
        <ul className='flex items-center'>
            <li className='mx-4 tablet:text-[18px] mobile:text-[14px] text-black100 font-semibold'>
                <RegisterNav/>
            </li>
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