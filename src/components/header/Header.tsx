'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from "next/link";
import RegisterNav from "@/components/header/RegisterNav";

function Header() {
    return (
        <header className='my-2'>
            <nav>
                <ul className='flex items-center'>
                    <li className='inline-block relative pc:w-[200px] pc:h-[60px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'>
                        <Link href='/'>
                                <Image src={logo} alt='trustcrews 로고 이미지' fill style={{objectFit:'cover'}} quality={100}/>
                        </Link>
                    </li>
                    <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] text-black100 font-semibold tablet:ml-auto mobile:ml-auto'>
                        <RegisterNav/>
                    </li>
                    <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'>
                        <Link href='/login'>로그인</Link>
                    </li>
                    {/* 로그인한 상태 : */}
                    {/*<UserMenu nickName='찐개발자' src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>*/}
                </ul>
            </nav>
        </header>
    );
}

export default Header;