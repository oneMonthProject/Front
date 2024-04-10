'use client';
import {useRecoilState} from "recoil";
import React from "react";
import {SelectItem} from "@/utils/type";
import {projectNoticeActiveMenuStateStore} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import Select from "@/components/ui/Select";
import {PROJECT_NOTICE_MENU} from "@/app/project/@notice/_utils/constant";
import {ProjectNoticeMenuName, ProjectNoticeMenuValue} from "@/app/project/@notice/_utils/type";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function NoticeNavTab() {
    const [activeNoticeMenu, setActiveNoticeMenu] = useRecoilState(projectNoticeActiveMenuStateStore);


    /**
     * 모바일 nav select handler
     * @param item
     */
    function onChangeSelectHandler(item: SelectItem<ProjectNoticeMenuName, ProjectNoticeMenuValue>) {
        setActiveNoticeMenu(item);
    }

    return (
        <nav className="flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8"
             aria-label="Sidebar">
            <ul role="list"
                className="mobile:hidden tablet:-mx-2 tablet:space-y-1">
                {
                    Object.values(PROJECT_NOTICE_MENU).map(({name, value}) => (
                            <li key={value}>
                                <div
                                    className={classNames(
                                        value === activeNoticeMenu.value ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                        'group flex items-center rounded-md p-5 pl-3 text-xl text-center leading-6 font-medium cursor-pointer'
                                    )}
                                    onClick={() => setActiveNoticeMenu({name, value})}>
                                    {name}
                                </div>
                            </li>
                        )
                    )}
            </ul>
            <div className='mobile:block hidden'>
                <Select
                    items={Object.values(PROJECT_NOTICE_MENU)}
                    label=''
                    setValue={onChangeSelectHandler}
                    value={activeNoticeMenu}
                />
            </div>
        </nav>

    )
}
