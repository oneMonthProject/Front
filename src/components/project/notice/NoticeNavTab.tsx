'use client';
import {useRecoilState, useRecoilValue} from "recoil";
import React, {MouseEvent, useState} from "react";
import {NavTabItem, SelectItem} from "@/utils/type";
import {
    currentProjectNoticeNavTabSelector,
    projectNoticeNavTabStateStore
} from "@/store/project/notice/ProjectNoticeNavTabStateStore";
import Select from "@/components/ui/Select";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function NoticeNavTab() {
    const [noticeNavTabs, setNoticeNavTabs] = useRecoilState(projectNoticeNavTabStateStore);
    const [noticeNavSelect, setNoticeNavSelect] = useState<SelectItem | null>({name:'전체',value:'전체'});
    const currentNoticeNavTab = useRecoilValue(currentProjectNoticeNavTabSelector);

    function onClickHandler({target}: MouseEvent<HTMLElement>) {
        const updatedNavTabs: NavTabItem[] = [];

        [...noticeNavTabs].forEach((v) => {
            updatedNavTabs.push({
                ...v,
                current: v.href === (target as HTMLElement).dataset.pathname
            });
        });

        setNoticeNavTabs(updatedNavTabs);
    }

    return (
        <nav className="flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8"
             aria-label="Sidebar">
            <ul role="list"
                className="mobile:hidden tablet:-mx-2 tablet:space-y-1">
                {noticeNavTabs.map((item) => (
                        <li key={item.name}>
                            <div
                                key={item.name}
                                className={classNames(
                                    item.href === currentNoticeNavTab.href ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                    'group flex items-center rounded-md p-5 pl-3 text-xl text-center leading-6 font-medium cursor-pointer'
                                )}
                                data-pathname={item.href}
                                onClick={onClickHandler}>
                                {item.name}
                            </div>
                        </li>
                    )
                )}
            </ul>
            <div className='mobile:block hidden'>
                <Select
                    items={
                        noticeNavTabs.map(
                            v => {
                                return {name: v.name, value: v.name}
                            }
                        )}
                    label=''
                    setValue={setNoticeNavSelect}
                    value={noticeNavSelect}
                />
            </div>
        </nav>

    )
}
