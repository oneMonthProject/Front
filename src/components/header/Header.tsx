import React, { Suspense } from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from "next/link";
import RegisterNav from "@/components/header/RegisterNav";
import { getCookie } from 'cookies-next';
import UserMenu from './UserMenu';
import { cookies } from "next/headers";

function Header() {
  const userId = getCookie("user_id", { cookies });

  return (
    <header className='my-2'>
      <nav>
        <ul className='flex items-center'>
          <li className='inline-block relative pc:w-[200px] pc:h-[60px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'>
            <Link href='/'>
              <Image src={logo} alt='trustcrews 로고 이미지' fill style={{ objectFit: 'cover' }} quality={100} />
            </Link>
          </li>
          <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] text-black100 font-semibold tablet:ml-auto mobile:ml-auto'>
            <RegisterNav />
          </li>
          {
            userId ? (
              <Suspense fallback={<div>Loading...</div>}>
                <UserMenu />
              </Suspense>
            ) : (
              <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'>
                <Link href='/login'>로그인</Link>
              </li>
            )
          }
        </ul>
      </nav>
    </header>
  );
}

export default Header;