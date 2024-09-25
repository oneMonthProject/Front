import React from 'react';
import Link from "next/link";

function UserGuideNavLink({children, href}: { children: React.ReactNode, href: string }) {
    return (
        <li className='mr-6'>
            <Link href={href} className='group font-bold text-teal-600'>
                <span className='no-underline group-hover:underline text-lg mobile:text-sm'>{children}</span>
            </Link>
        </li>
    );
}

export default UserGuideNavLink;