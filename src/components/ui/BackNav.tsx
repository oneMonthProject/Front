import React from 'react';
import Link from "next/link";
import {IoMdArrowRoundBack} from "@react-icons/all-files/io/IoMdArrowRoundBack";

interface BackNavProps {
    to:string;
}
function BackNav({to}:BackNavProps) {
    return (
        <Link href={to}>
                <IoMdArrowRoundBack className='tablet:h-12 tablet:w-12 mobile:h-6 mobile:w-6 text-grey700'/>
        </Link>
    );
}

export default BackNav;