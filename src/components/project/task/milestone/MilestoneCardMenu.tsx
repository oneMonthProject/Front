'use client';
import React, {Fragment, useEffect, useState} from 'react';
import {IoEllipsisVertical} from "@react-icons/all-files/io5/IoEllipsisVertical";
import {Menu, Transition} from "@headlessui/react";
import Link from "next/link";
import {classNames} from "@/utils/common";

interface MilestoneCardMenuProps {
    milestoneId: string;
}

function MilestoneCardMenu({milestoneId}: MilestoneCardMenuProps) {
    const [menuPortal, setMenuPortal] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMenuPortal(document.getElementById('milestoneMenuPortal'));
    }, []);

    function onEditClickHandler(milestoneId: string) {
        // todo - 마일스톤 수정 api
    }

    function onDeleteClickHandler(milestoneId: string) {
        // todo - 마일스톤 삭제 api
    }

    const milestoneMenus = [
        {
            name: '수정',
            value: milestoneId,
            onClickHandler: onEditClickHandler
        },
        {
            name: '삭제',
            value: milestoneId,
            onClickHandler: onDeleteClickHandler
        }
    ]

    return (

        // <div className="flex-shrink-0 pr-2 overflow-visible">
        <Menu as="div" className="flex-shrink-0 pr-2 text-center">
            {/*<Menu as="div" className="relative inline-block text-center">*/}
                <div>
                    <Menu.Button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none">
                        <span className="sr-only">마일스톤 메뉴</span>
                        <IoEllipsisVertical className="h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-2 z-10 mt-1 tablet:min-w-[60px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 ">
                            {
                                milestoneMenus.map(v =>
                                    <Menu.Item key={v.name}>
                                        {({active}) => (
                                            v.onClickHandler ?
                                                <a

                                                    href="javascript;"
                                                    onClick={() => v.onClickHandler!(v.value)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm'
                                                    )}
                                                >
                                                    {v.name}
                                                </a>
                                                : <Link
                                                    href={v.value}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm'
                                                    )}
                                                >
                                                    {v.name}
                                                </Link>
                                        )}
                                    </Menu.Item>
                                )
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
    );
}

export default MilestoneCardMenu;
