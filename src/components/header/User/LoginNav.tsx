import React from 'react';
import Link from "next/link";

function LoginNav() {
    return (
        <li className='tablet:mx-5 mobile:mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'>
            <Link href='/login'>로그인</Link>
        </li>
    );
}

export default LoginNav;