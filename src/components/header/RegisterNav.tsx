'use client';

import React from 'react';
import {useMediaQuery} from "react-responsive";
import {IoCreateOutline} from "@react-icons/all-files/io5/IoCreateOutline";
import Link from "next/link";

function RegisterNav() {
    const isDesktop = useMediaQuery({query: '(min-width: 1280px)'});

    return (
        <Link href='/register'>
            {
                isDesktop ? '프로젝트 모집' : <IoCreateOutline className='h-6 w-6'/>
            }
        </Link>
    );
}

export default RegisterNav;