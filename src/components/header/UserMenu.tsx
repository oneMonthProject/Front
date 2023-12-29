'use client';
import React from 'react';
import DropDownWithIcon from "@/components/ui/DropDownWithIcon";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { useMediaQuery } from "react-responsive";
import { DropDownItem } from "@/utils/type";
import { ResponseBody } from '@/utils/type';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import Avatar from '@/components/ui/Avatar';
import { logout } from '@/service/logout';
import { getSimpleUser } from '@/service/user';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { activeTabState } from '@/store/MainStateStore';

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
  const setProjectTab = useSetRecoilState(activeTabState);
  const { data } = useSuspenseQuery<ResponseBody<UserBasicInfo>, Error>({ queryKey: ['simpleUserInfo'], queryFn: getSimpleUser });
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setProjectTab(false);
      router.push("/");
      router.refresh();
    }
  });

  const isDesktop = useMediaQuery({ query: '(min-width: 361px)' });
  const items: DropDownItem[] = [
    new UserMenuItem('내 프로필', '/user/profile'), new UserMenuItem('로그아웃', '/user/logout', () => mutate())
  ]
  const { nickname, profileImgSrc } = data.data;

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