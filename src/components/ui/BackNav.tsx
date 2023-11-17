import React from 'react';
import Link from "next/link";
import {IoMdArrowRoundBack} from "@react-icons/all-files/io/IoMdArrowRoundBack";

interface BackNavProps {
    to:string;
}
function BackNav({to}:BackNavProps) {
    return (
        <Link href={to}>
                <IoMdArrowRoundBack className='h-12 w-12 text-grey700'/>
        </Link>
    );
}

export default BackNav;