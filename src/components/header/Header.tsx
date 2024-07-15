import React from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from "next/link";
import User from "./User/User";

function Header() {
    return (
        <header className='my-2'>
            <nav>
                <ul className='flex items-center justify-between'>
                    <li className='inline-block relative pc:w-[200px] pc:h-[50px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'>
                        <Link href='/'>
                            <Image src={logo} alt='trustcrews 로고 이미지' fill style={{objectFit: 'cover', position:'absolute', top:'50%', transform:'translateY(-40%)'}} quality={100}
                                   priority/>
                        </Link>
                    </li>
                    <User/>
                </ul>
            </nav>
        </header>
    );
}

export default Header;