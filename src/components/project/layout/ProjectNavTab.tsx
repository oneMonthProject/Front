'use client';
import React, {MouseEvent, useEffect} from 'react';
import Link from "next/link";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentProjectNavTabSelector, projectNavTabState} from "@/store/project/ProjectNavTabStateStore";
import {ProjectNavTabItem} from "@/utils/type";
import {useQueryString} from "@/hooks/useQueryString";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function ProjectNavTab() {
    const projectId = useQueryString('projectId');
    const [projectNavTabs, setProjectNavTabs] = useRecoilState(projectNavTabState);
    const currentProjectNavTab = useRecoilValue(currentProjectNavTabSelector);


    function onClickHandler({target}: MouseEvent<HTMLAnchorElement>) {
        const updatedProjectNavTabs: ProjectNavTabItem[] = [];

        [...projectNavTabs].forEach((v) => {
            updatedProjectNavTabs.push({
                ...v,
                current: v.href === (target as HTMLAnchorElement).dataset.pathname
            });
        });

        setProjectNavTabs(updatedProjectNavTabs);
    }


    return currentProjectNavTab && (
        <div className='tablet:my-[3.9rem] mobile:my-[3rem]'>
            <div className="border-b-[3px] border-grey300">
                <nav className="-mb-px flex tablet:space-x-10 mobile:justify-between" aria-label="Tabs">
                    {projectNavTabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={{
                                pathname: tab.href,
                                query: {projectId}
                            }}
                            className={classNames(
                                tab.href === currentProjectNavTab.href
                                    ? 'border-secondary text-secondary'
                                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                                'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold'
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