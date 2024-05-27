'use client';
import {useRecoilState} from "recoil";
import React from "react";
import {projectNoticeActiveMenuStateStore} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import Select from "@/components/ui/selector/Select";
import {PROJECT_NOTICE} from "@/app/project/@notice/_utils/constant";
import {ProjectNoticeKey} from "@/app/project/@notice/_utils/type";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function NoticeNavTab() {
    const [activeNoticeMenu, setActiveNoticeMenu] = useRecoilState(projectNoticeActiveMenuStateStore);


    return (
        <nav className="flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8"
             aria-label="Sidebar">
            <ul role="list"
                className="mobile:hidden tablet:-mx-2 tablet:space-y-1">
                {
                    (Object.keys(PROJECT_NOTICE) as ProjectNoticeKey[])
                        .map((noticeKey) => (
                                <li key={noticeKey}>
                                    <div
                                        className={classNames(
                                            noticeKey === activeNoticeMenu ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                            'group flex items-center rounded-md p-5 pl-3 text-xl text-center leading-6 font-medium cursor-pointer'
                                        )}
                                        onClick={() => setActiveNoticeMenu(noticeKey)}>
                                        {PROJECT_NOTICE[noticeKey].desc}
                                    </div>
                                </li>
                            )
                        )}
            </ul>
            <div className='mobile:block hidden'>
                <Select
                    items={(Object.keys(PROJECT_NOTICE) as ProjectNoticeKey[])
                        .map(noticeKey => ({
                            name: PROJECT_NOTICE[noticeKey].desc,
                            value: noticeKey
                        }))}
                    label=''
                    setValue={(item) => setActiveNoticeMenu(item.value)}
                    value={{name: PROJECT_NOTICE[activeNoticeMenu].desc, value: activeNoticeMenu}}
                />
            </div>
        </nav>

    )
}
