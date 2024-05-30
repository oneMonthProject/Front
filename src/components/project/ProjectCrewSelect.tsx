'use client';
import React, {Fragment} from 'react';
import useProjectCrewList from "@/hooks/useProjectCrewList";
import {ProjectMember, SelectItem} from "@/utils/type";
import {useRecoilState, useRecoilValue} from "recoil";
import {TaskField, taskModalFieldSelector} from "@/store/project/task/TaskStateStore";
import {Listbox, Transition} from "@headlessui/react";
import {bigIntToString, changeImageUrl, classNames} from "@/utils/common";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import Avatar from "@/components/ui/Avatar";
import {AssignedUser} from "@/app/project/@task/_utils/type";
import DefaultSelectOption from "@/components/ui/selector/DefaultSelectOption";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";

const compareItems = (a: SelectItem<string, string>, b: SelectItem<string, string>) => {
    if (a && b) {
        return a?.value === b?.value;
    }
    return false;
}

export const DEFAULT_CREW_OPTION = {name: '멤버 선택', value: null} as const;

function getSelectedCrew(
    assignedUser: AssignedUser | null, crewList: ProjectMember[]
): SelectItem<string, bigint | null> {
    if (!assignedUser) return DEFAULT_CREW_OPTION;

    const selectedCrew = crewList.find(
        ({projectMemberId}) => projectMemberId === (assignedUser as AssignedUser).projectMemberId
    )!;

    return {name: selectedCrew.user.nickname, value: selectedCrew.projectMemberId}
}

function ProjectCrewSelect() {
    const [assignedUser, setAssignedUser] = useRecoilState(taskModalFieldSelector('assignedUser'));
    const projectId = useRecoilValue(projectIdState)!;
    const {crewList, isFetching} = useProjectCrewList(projectId);

    if (isFetching) return <SelectSkeleton label='' placeholder='담당 멤버' className='max-w-[150px]'/>

    const selectedCrew = getSelectedCrew(assignedUser as TaskField<'assignedUser'>, crewList);

    return (
        <Listbox
            value={selectedCrew}
            onChange={({name, value}) => {
                const updatedAssignedUser: TaskField<'assignedUser'> = value ? {
                    projectMemberId: value,
                    nickname: name
                } : null;
                setAssignedUser(updatedAssignedUser);
            }}
            by={compareItems}
        >
            {({open}) => (
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
                            <DefaultSelectOption selectItem={DEFAULT_CREW_OPTION} keyProps='defaultOption'/>
                            {crewList.map(({user: {nickname, profileImgSrc}, projectMemberId}) => (
                                <Listbox.Option
                                    key={bigIntToString(projectMemberId)}
                                    className={({active}) =>
                                        classNames(
                                            active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm'
                                        )
                                    }
                                    value={{name: nickname, value: projectMemberId}}
                                >
                                    {
                                        ({selected, active}) =>
                                            (
                                                <>
                                                        <span
                                                            className={classNames(selected ? 'font-bold' : 'font-normal', 'flex items-center space-x-2 block truncate')}>
                                                            {
                                                                projectMemberId !== null &&
                                                                <Avatar
                                                                    src={changeImageUrl(profileImgSrc)}
                                                                    alt={`${nickname}의 프로필 이미지`}
                                                                    size='2xs'/>
                                                            }
                                                            <span>{nickname}</span>
                                                        </span>
                                                    {
                                                        selected ? (
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
            )}
        </Listbox>
    )
}

export default ProjectCrewSelect;