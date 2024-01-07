'use client';
import {useRecoilState, useRecoilValue} from "recoil";
import React, {MouseEvent} from "react";
import {NoticeNavTabItem, SelectItem} from "@/utils/type";
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
    const currentNoticeNavTab = useRecoilValue(currentProjectNoticeNavTabSelector);

    /**
     * 태블릿/pc nav tab handler
     * @param target
     */
    function onClickHandler({target}: MouseEvent<HTMLElement>) {
        const updatedNavTabs: NoticeNavTabItem[] = [];

        [...noticeNavTabs].forEach((v) => {
            updatedNavTabs.push({
                ...v,
                current: v.type_kor === (target as HTMLElement).textContent
            });
        });

        setNoticeNavTabs(updatedNavTabs);
    }

    /**
     * 모바일 nav select handler
     * @param item
     */
    function onChangeSelectHandler(item: SelectItem) {
        const updatedNavTabs: NoticeNavTabItem[] = [];

        [...noticeNavTabs].forEach((v) => {
            updatedNavTabs.push({
                ...v,
                current: v.type_kor === item.name
            });
        });

        setNoticeNavTabs(updatedNavTabs);
    }

    return (
        <nav className="flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8"
             aria-label="Sidebar">
            <ul role="list"
                className="mobile:hidden tablet:-mx-2 tablet:space-y-1">
                {
                    noticeNavTabs.map((item) => (
                            <li key={item.type}>
                                <div
                                    className={classNames(
                                        item.type_kor === currentNoticeNavTab.type_kor ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                        'group flex items-center rounded-md p-5 pl-3 text-xl text-center leading-6 font-medium cursor-pointer'
                                    )}
                                    onClick={onClickHandler}>
                                    {item.type_kor}
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
                                return {
                                    name: v.type_kor,
                                    value: v.type
                                }
                            }
                        )}
                    label=''
                    setValue={onChangeSelectHandler}
                    value={{
                        name: currentNoticeNavTab.type_kor,
                        value: currentNoticeNavTab.type
                    }}
                />
            </div>
        </nav>

    )
}
