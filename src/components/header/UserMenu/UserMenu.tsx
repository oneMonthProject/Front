'use client';
import React from 'react';
import {useMediaQuery} from "react-responsive";
import {ResponseBody, UserBasicInfo} from "@/utils/type";
import {useSuspenseQuery} from '@tanstack/react-query';
import Avatar from '@/components/ui/Avatar';
import {getSimpleUser} from '@/service/user/user';
import UserMenuDropdown from "@/components/header/UserMenu/UserMenuDropdown";


function UserMenu() {
    const {data} = useSuspenseQuery<ResponseBody<UserBasicInfo>, Error>(
        {
            queryKey: ['simpleUserInfo'],
            queryFn: getSimpleUser
        }
    );
    const {nickname, profileImgSrc} = data.data;

    const isDesktop = useMediaQuery({query: '(min-width: 376px)'});

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