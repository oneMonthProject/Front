'use client';
import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {IoEllipsisVertical} from "@react-icons/all-files/io5/IoEllipsisVertical";
import {classNames} from "@/utils/common";
import Link from "next/link";
import {useRecoilState} from "recoil";
import {currentTaskFormState, TaskForm} from "@/store/project/task/TaskStateStore";

interface TaskCardMenuProps {
    taskId: string;
}

function TaskCardMenu({taskId}:TaskCardMenuProps) {
    const [taskState, setTaskState] = useRecoilState(currentTaskFormState);

    function onEditClickHandler(taskId: string) {
        // todo - 업무 수정 api
        setTaskState(new TaskForm('modify',taskId, 'db 스키마 설계',false, null, null, null, 'tester',null));
    }

    function onDeleteClickHandler(taskId: string) {
        // todo - 업무 삭제 api
    }

    const milestoneMenus = [
        {
            name: '수정',
            value: taskId,
            onClickHandler: onEditClickHandler
        },
        {
            name: '삭제',
            value: taskId,
            onClickHandler: onDeleteClickHandler
        }
    ]

    return (

        // <div className="flex-shrink-0 pr-2 overflow-visible">
        <Menu as="div" className="relative flex-shrink-0 text-center">
            {/*<Menu as="div" className="relative inline-block text-center">*/}
            <div>
                <Menu.Button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-500 hover:text-gray-600 focus:outline-none">
                    <span className="sr-only">업무 메뉴</span>
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
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    v.onClickHandler!(v.value);
                                                }}
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

export default TaskCardMenu;