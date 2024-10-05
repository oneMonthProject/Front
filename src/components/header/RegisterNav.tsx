'use client';

import React from 'react';
import {useMediaQuery} from "react-responsive";
import {IoCreateOutline} from "@react-icons/all-files/io5/IoCreateOutline";
import Link from "next/link";

function RegisterNav() {
    const isDesktop = useMediaQuery({query: '(min-width: 1280px)'});

    return (
        <Link href='/register' aria-label='프로젝트 생성 페이지'>
            <div aria-hidden='true' className='mx-4 tablet:text-[18px] mobile:text-[14px] text-black100 font-semibold'>
                {
                    isDesktop ? '새 프로젝트' : <IoCreateOutline className='h-6 w-6'/>
                }
            </div>
        </Link>
    );
}

export default RegisterNav;