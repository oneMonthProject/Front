'use client';
import React, {MouseEvent} from 'react';
import Link from "next/link";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentProjectNavTab, projectNavTabSelector} from "@/store/project/ProjectNavTabStateStore";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProjectNavTab() {
    const projectNavTabs = useRecoilValue(projectNavTabSelector);
    const [currentNavTab, setCurrentNavTab] = useRecoilState(currentProjectNavTab);


    function onClickHandler({target}: MouseEvent<HTMLAnchorElement>) {
        setCurrentNavTab((target as HTMLAnchorElement).dataset.pathname!);
    }


    return (
        <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
            <div className="border-b-[3px] border-grey300">
                <nav className="-mb-px flex tablet:space-x-10 mobile:justify-between" aria-label="Tabs">
                    {projectNavTabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.href === currentNavTab
                                    ? 'border-secondary text-secondary'
                                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold'
                            )}
                            aria-current={tab.href === currentNavTab ? 'page' : undefined}
                            onClick={onClickHandler}
                            data-pathname={tab.href}
                            replace
                        >
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}