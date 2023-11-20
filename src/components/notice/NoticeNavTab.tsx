'use client';
import {useRecoilState, useRecoilValue} from "recoil";
import {currentProjectNoticeNavTabSelector, projectNoticeNavTabStateStore} from "@/store/ProjectNoticeNavTabStateStore";
import {MouseEvent} from "react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function NoticeNavTab() {
    const [noticeNavTabs, setNoticeNavTabs] = useRecoilState(projectNoticeNavTabStateStore);
    const currentNoticeNavTab = useRecoilValue(currentProjectNoticeNavTabSelector);

    function onClickHandler({target}: MouseEvent<HTMLElement>) {
        const updatedNavTabs: NavTabItem[] = [];

        [...noticeNavTabs].forEach((v, i) => {
            updatedNavTabs.push({
                ...v,
                current: v.href === (target as HTMLElement).dataset.pathname
            });
        });

        setNoticeNavTabs(updatedNavTabs);
    }


    return (
        <nav className="flex flex-1 flex-col max-w-[10rem]" aria-label="Sidebar">
            <ul role="list" className="-mx-2 space-y-1">
                {noticeNavTabs.map((item) => (
                    <li key={item.name}>
                        <div
                            key={item.name}
                            className={classNames(
                                item.href === currentNoticeNavTab.href ? 'bg-gray-50 text-primary' : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                'group flex items-center rounded-md p-5 pl-3 tablet:text-xl text-center leading-6 font-medium cursor-pointer'
                            )}
                            data-pathname={item.href}
                            onClick={onClickHandler}
                        >
                            {item.name}
            </div>
        </li>
    )
)}
</ul>
</nav>

)
}
