import React from 'react';
import Link from "next/link";

function UserGuideNavLink({children, href}: { children: React.ReactNode, href: string}) {
    return (
        <li className='mr-6'>
            <Link href={href} className='flex items-center space-x-1 group font-bold text-teal-600' >
                <span aria-hidden='true'>👉</span>
                <div className='no-underline group-hover:underline text-lg mobile:text-sm'>
                    {children}<span className='sr-only'>이용안내</span>
                </div>
            </Link>
        </li>
    );
}

export default UserGuideNavLink;