'use client';
import React, {Fragment} from 'react';
import useProjectCrewList from "@/hooks/useProjectCrewList";
import {ProjectMember, SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import {Listbox, Transition} from "@headlessui/react";
import {classNames} from "@/utils/common";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import Avatar from "@/components/ui/Avatar";

const compareItems = (a: SelectItem, b: SelectItem) => {
    if (a && b) {
        return a?.value === b?.value;
    }

    return false;
}

function ProjectCrewSelect() {
    const [taskModalForm, setTaskModalForm] = useRecoilState(taskModalFormState);
    const {data} = useProjectCrewList();

    const projectCrewListItems = data.projectMembers.map((v: ProjectMember) => {
        return {
            name: v.user.nickname,
            value: v.projectMemberId.toString(),
            profileImgSrc: v.user.profileImgSrc
        }
    });

    console.log("taskform in crewselect: ", taskModalForm);

    const selectedCrew = projectCrewListItems
            .find((v: SelectItem) => v.value === taskModalForm?.assignedUser?.projectMemberId.toString())
        || {name: '멤버 선택', value: ''};

    function setSelectedCrew(item: SelectItem) {
        const updated = {
            ...taskModalForm as TaskModalForm,
            assignedUser: {projectMemberId: item.value as bigint, nickname: item.name}
        };
        setTaskModalForm(updated);
    }


    return (
        <Listbox value={selectedCrew} onChange={setSelectedCrew} by={compareItems}>
            {({open}) => (
                <div>
                    <div className="relative w-full tablet:w-[200px] ">
                        <Listbox.Button
                            className="w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                              <span className={classNames(selectedCrew ? '' : 'text-greyUnselect', 'block truncate')}>
                                {selectedCrew ? selectedCrew.name : '멤버 선택'}
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
                                <Listbox.Option
                                    key='default'
                                    className={({active}) =>
                                        classNames(
                                            active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm'
                                        )
                                    }
                                    value=''
                                >
                                    {({selected, active}) => (
                                        <>
                                          <span
                                              className={classNames(selected ? 'font-bold' : 'font-normal', 'flex items-center space-x-2 block truncate')}>
                                                <span>멤버 선택</span>
                                          </span>
                                            {
                                                selected ?
                                                    (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-primary',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        ></span>
                                                    )
                                                    : null
                                            }
                                        </>
                                    )}
                                </Listbox.Option>
                                {projectCrewListItems.map((item) => (
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
                                        {
                                            ({selected, active}) =>
                                                (
                                                    <>
                                                        <span
                                                            className={classNames(selected ? 'font-bold' : 'font-normal', 'flex items-center space-x-2 block truncate')}>
                                                            <Avatar src={item.profileImgSrc}
                                                                    alt={`${item.name}의 프로필 이미지`}
                                                                    size='2xs'/>
                                                          <span>{item.name}</span>
                                                        </span>
                                                        {
                                                            selected ?
                                                                (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-primary',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    ></span>
                                                                )
                                                                : null
                                                        }
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

export default ProjectCrewSelect;