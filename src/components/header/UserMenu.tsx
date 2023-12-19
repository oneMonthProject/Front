'use client';
import React from 'react';
import DropDownWithIcon from "@/components/ui/DropDownWithIcon";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { useMediaQuery } from "react-responsive";
import { DropDownItem } from "@/utils/type";
import { getSimpleUser as getSimpleUserAPI } from "@/service/user";
import { ResponseBody } from '@/utils/type';
import { useQuery } from '@tanstack/react-query';
import Avatar from '../ui/Avatar';
import Link from 'next/link';
import { logout } from '@/service/logout';
import { isEqual } from 'lodash';
import { useRouter } from 'next/navigation';

interface UserBasicInfo {
  nickname: string;
  profileImgSrc: string;
}

class UserMenuItem implements DropDownItem {
  name: string;
  value: string;
  onClickHandler?: (value: string) => void;

  constructor(name: string, value: string, onClickHandler?: (value: string) => void) {
    this.name = name;
    this.value = value;
    if (onClickHandler) {
      this.onClickHandler = onClickHandler;
    }
  }
}

function UserMenu() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<ResponseBody<UserBasicInfo>, Error>({
    queryKey: ['simpleUserInfo'],
    queryFn: () => getSimpleUserAPI()
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 361px)'
  });

  if (isLoading) {
    return (
      <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'>
        <Link href='/login'>로그인</Link>
      </li>
    );
  }

  if (error) return 'An error has occurred: ' + error.message;

  const userLogout = () => {
    logout().then(response => {
      const { result } = response;
      if (isEqual(result, "success")) {
        router.push("/");
        router.refresh();
      }
    })
  }

  const items: DropDownItem[] = [
    new UserMenuItem('내 프로필', '/user/profile'), new UserMenuItem('로그아웃', '/user/logout', () => userLogout())
  ]

  const { nickname, profileImgSrc } = data!.data;

  return (
    <ul className='flex items-center'>
      <li className='flex items-center mx-2'>
        <Avatar size="2xs" alt="사용자" src={profileImgSrc} />
        {
          isDesktop && <span className='pl-2 text-grey90'>{nickname}</span>
        }
      </li>
      <li className='flex items-center tablet:p-1 mr-2'>
        <DropDownWithIcon items={items} icon={<FaChevronDown className="h-4 w-4" aria-hidden="true" />} srOnlyButtonName='사용자 메뉴' />
      </li>
    </ul>
  );
}

export default UserMenu;