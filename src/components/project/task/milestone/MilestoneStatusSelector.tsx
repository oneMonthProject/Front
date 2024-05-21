'use client';

import React, {Fragment} from 'react';
import {Listbox, Transition} from "@headlessui/react";
import {classNames} from "@/utils/common";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {
    MilestoneModalForm,
    milestoneModalFormState,
    MilestoneStatusItem,
    milestoneStatusItems
} from "@/store/project/task/MilestoneStateStore";


function MilestoneStatusSelector() {
    const [currentForm, setCurrentForm] = useRecoilState(milestoneModalFormState);

    const {progressStatusCode, progressStatus} = currentForm!;

    function onChangeHandler(item: MilestoneStatusItem) {
        const updated = {
            ...currentForm,
            progressStatus: item.name,
            progressStatusCode: item.value
        } as MilestoneModalForm;
        setCurrentForm(updated);
    }

    const compareItems = (a: SelectItem<typeof progressStatus, typeof progressStatusCode>
                          , b: SelectItem<typeof progressStatus, typeof progressStatusCode>) => {
        if (a && b) {
            return a?.value === b?.value;
        }
        return false;
    }

    return (
        <Listbox value={{name: progressStatus, value: progressStatusCode}} onChange={onChangeHandler} by={compareItems}>
            {({open}) => (
                <div>
                    <div className="relative">
                        <Listbox.Button
                            className="mobile:text-sm w-full cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                          <span className={classNames(progressStatus ? '' : 'text-greyUnselect', 'block truncate')}>
                            {progressStatus === '' ? '선택' : progressStatus}
                          </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <AiFillCaretDown className="w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </Listbox.Button>
                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {milestoneStatusItems.map((item) => (
                                    <Listbox.Option
                                        key={item.value}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                        <span className={classNames(selected ? 'font-bold' : 'font-normal', 'block truncate')}>
                          {item.name}
                        </span>
                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-primary',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}

export default MilestoneStatusSelector;