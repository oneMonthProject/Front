'use client';
import React, {MouseEvent} from 'react';
import Link from "next/link";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentProjectNavTabSelector, projectNavTabState} from "@/store/ProjectNavTabStateStore";
import {usePathname} from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProjectNavTab() {
    const [projectNavTabs, setProjectNavTabs] = useRecoilState(projectNavTabState);
    const currentProjectNavTab = useRecoilValue(currentProjectNavTabSelector);


    function onClickHandler({target}: MouseEvent<HTMLAnchorElement>) {
        const updatedProjectNavTabs: ProjectNavTabItem[] = [];

        [...projectNavTabs].forEach((v, i) => {
            updatedProjectNavTabs.push({
                ...v,
                current: v.href === (target as HTMLAnchorElement).dataset.pathname
            });
        });

        setProjectNavTabs(updatedProjectNavTabs);
    }


    return (
            <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
                <div className="border-b-[3px] border-grey300">
                    <nav className="-mb-px flex tablet:space-x-10 mobile:space-x-6" aria-label="Tabs">
                        {projectNavTabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.href === currentProjectNavTab.href
                                        ? 'border-secondary text-secondary'
                                        : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                    'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold'
                                )}
                                aria-current={tab.href === currentProjectNavTab.href ? 'page' : undefined}
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