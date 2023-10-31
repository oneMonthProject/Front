import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {BiChevronDown} from "react-icons/bi";


function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(' ')
}

export interface MenuItem<Value> {
    name: string;
    value: Value;
    onClickHandler: (value:Value) => void;
}

interface DropdownProps {
    defaultValue:string;
    menuItems: MenuItem<unknown>[];
}

function Dropdown({defaultValue, menuItems}:DropdownProps) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {defaultValue}
                    <BiChevronDown/>
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {menuItems.map((item) =>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => item.onClickHandler(item.value)}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default Dropdown;