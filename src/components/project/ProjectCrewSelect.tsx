'use client';
import React, {Fragment} from 'react';
import useProjectCrewList from "@/hooks/useProjectCrewList";
import {SelectItem} from "@/utils/type";
import {useRecoilState} from "recoil";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {Listbox, Transition} from "@headlessui/react";
import {bigIntToString, classNames} from "@/utils/common";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import Avatar from "@/components/ui/Avatar";

const compareItems = (a: SelectItem<string, string>, b: SelectItem<string, string>) => {
    if (a && b) {
        return a?.value === b?.value;
    }

    return false;
}

function ProjectCrewSelect() {
    const [modalState, setModalState] = useRecoilState(taskModalState);
    const {form} = modalState;
    const {assignedUser} = form!;

    const {data} = useProjectCrewList();

    const projectCrews =
        data.projectMembers.map(({user: {nickname}, projectMemberId}) => (
            {
                name: nickname,
                value: bigIntToString(projectMemberId),
            }
        ));

    const crewImages: Record<string, string> = {};
    for (const {projectMemberId, user: {profileImgSrc}} of data.projectMembers) {
        crewImages[bigIntToString(projectMemberId)] = profileImgSrc;
    }

    const projectCrewItems: SelectItem<string, string | null>[]
        = [{name: '멤버 선택', value: null}, ...projectCrews];


    const selectedCrew = assignedUser
        ? projectCrewItems.find(({value}) =>
            value === bigIntToString(assignedUser.projectMemberId)
        )! : projectCrewItems[0];


    function setSelectedCrew({name, value}: SelectItem<string, string | null>) {
        const updatedForm: typeof form = {
            ...modalState.form!,
            assignedUser: value ? {projectMemberId: BigInt(value), nickname: name} : null
        };
        setModalState({...modalState, form: updatedForm});
    }


    return (
        <Listbox value={selectedCrew} onChange={setSelectedCrew} by={compareItems}>
            {({open}) => (
                <div>
                    <div className="relative w-full tablet:w-[200px] ">
                        <Listbox.Button
                            className="w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                              <span className={classNames(selectedCrew ? '' : 'text-greyUnselect', 'block truncate')}>
                                {selectedCrew.name}
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
                                {projectCrewItems.map(({name, value}) => (
                                    <Listbox.Option
                                        key={value}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm'
                                            )
                                        }
                                        value={name}
                                    >
                                        {
                                            ({selected, active}) =>
                                                (
                                                    <>
                                                        <span
                                                            className={classNames(selected ? 'font-bold' : 'font-normal', 'flex items-center space-x-2 block truncate')}>
                                                            {
                                                                value && <Avatar src={crewImages[value]}
                                                                                 alt={`${name}의 프로필 이미지`}
                                                                                 size='2xs'/>
                                                            }
                                                            <span>{name}</span>
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