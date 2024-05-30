'use client';
import React from 'react';
import Link from "next/link";
import {useRecoilState} from "recoil";
import {projectActiveNavState} from "@/store/project/ProjectNavTabStateStore";
import {PROJECT_MENU} from "@/app/project/_utils/constant";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProjectNavTab({projectId}: { projectId: string }) {
    const [activeTabName, setActiveTabName] = useRecoilState(projectActiveNavState);


    return activeTabName && (
        <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
            <div className="border-b-[3px] border-grey300">
                <nav className="-mb-px" aria-label="Tabs">
                    <ul className='flex tablet:space-x-10 mobile:justify-between'>
                        {Object.values(PROJECT_MENU).map(({name, value, url}) => (
                            <li key={name}>
                                <Link
                                    href={{
                                        pathname: url,
                                        query: {projectId}
                                    }}
                                    className={classNames(
                                        value === activeTabName
                                            ? 'border-secondary text-secondary'
                                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                        'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold'
                                    )}
                                    aria-current={value === activeTabName ? 'page' : undefined}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTabName(value)
                                    }}
                                    replace
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}