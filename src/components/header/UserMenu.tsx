'use client';
import React from 'react';
import Image from "next/image";
import DropDownWithIcon from "@/components/ui/DropDownWithIcon";
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";
import {useMediaQuery} from "react-responsive";
import {DropDownItem} from "@/utils/type";

interface UserMenuProps {
    nickName:string;
    src:string;
}

class UserMenuItem implements DropDownItem {
    name: string;
    value: string;

    constructor(name:string, value:string) {
        this.name = name;
        this.value = value;
    }

}

const items:DropDownItem[] = [
    new UserMenuItem('내 프로필','/user/profile'), new UserMenuItem('로그아웃','/logout')
]

function UserMenu({nickName, src}: UserMenuProps) {
    const isDesktop = useMediaQuery({
        query:'(min-width: 361px)'
    });

    return (
            <ul className='flex items-center'>
                <li className='flex items-center mx-2'>
                    <div className='relative tablet:h-8 tablet:w-8  mobile:h-7 mobile:w-7 tablet:mx-2'>
                        <Image
                            src={src}
                            alt={`${nickName}의 아바타 이미지`}
                            fill
                            style={{borderRadius:'100%'}}
                        />
                    </div>
                    {
                        isDesktop && <span className='tablet:text-[20px] mobile:text-[16px] text-grey90'>{nickName}</span>
                    }
                </li>
                <li className='flex items-center tablet:p-1 mr-2'>
                    <DropDownWithIcon items={items} icon={<FaChevronDown className="h-4 w-4" aria-hidden="true" />} srOnlyButtonName='사용자 메뉴'/>
                </li>
            </ul>
    );
}

export default UserMenu;