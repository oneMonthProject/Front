'use client';
import React from 'react';
import Link from "next/link";
import {useQueryString} from "@/hooks/useQueryString";
import {projectMenuList} from "@/utils/constant";
import {useRecoilState} from "recoil";
import {projectActiveNavState} from "@/store/project/ProjectNavTabStateStore";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProjectNavTab() {
    const projectId = useQueryString('projectId');
    const [activeTabName, setActiveTabName] = useRecoilState(projectActiveNavState);


    return activeTabName && (
        <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
            <div className="border-b-[3px] border-grey300">
                <nav className="-mb-px " aria-label="Tabs">
                    <ul className='flex tablet:space-x-10 mobile:justify-between'>
                        {projectMenuList.map(({name, path}) => (
                            <li key={name}>
                                <Link
                                    href={{
                                        pathname: path,
                                        query: {projectId}
                                    }}
                                    className={classNames(
                                        name === activeTabName
                                            ? 'border-secondary text-secondary'
                                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                        'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold'
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTabName(name)
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