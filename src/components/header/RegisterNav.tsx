'use client';

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useMediaQuery} from "react-responsive";
import {IoCreateOutline} from "@react-icons/all-files/io5/IoCreateOutline";

function RegisterNav() {
    const [desktop, setDesktop] = useState(false);

    const isWide = useMediaQuery({
        query: "(min-width: 361px)"
    });

    useEffect(()=> {
        setDesktop(isWide);
    });


    return (
        <Link href='/register'>
            {
                desktop ? '새 글쓰기' : <IoCreateOutline className='h-7 w-7'/>
            }
        </Link>
    );
}

export default RegisterNav;