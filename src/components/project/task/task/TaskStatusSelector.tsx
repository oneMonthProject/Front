import React, {Fragment} from 'react';
import {useRecoilState} from "recoil";
import {SelectItem} from "@/utils/type";
import {Listbox, Transition} from "@headlessui/react";
import {classNames} from "@/utils/common";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import {TaskModalState, taskModalState} from "@/store/project/task/TaskStateStore";
import {
    TaskModifyForm,
    TaskStatusNameType as Name,
    TaskStatusValueType as Value
} from "@/app/project/@task/_utils/type";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

function TaskStatusSelector() {
    const [modalState, setModalState] = useRecoilState(taskModalState);

    if (modalState.form!.type === 'add') return null;

    const form: TaskModifyForm = modalState.form!;

    const {progressStatusCode, progressStatus} = form;

    function onChangeHandler(item: SelectItem<Name, Value>) {
        const updatedForm: TaskModifyForm = {
            ...form,
            progressStatus: item.name,
            progressStatusCode: item.value
        };

        const updatedModalState: TaskModalState<TaskModifyForm> = {...modalState, form: updatedForm};
        setModalState(updatedModalState);
    }

    const compareItems = (a: SelectItem<Name, Value>, b: SelectItem<Name, Value>) => {
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
                              {progressStatus}
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
                                {Object.values(TASK_STATUS).map(({name, value}) =>
                                    (
                                        <Listbox.Option
                                            key={value}
                                            className={({active}) =>
                                                classNames(
                                                    active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-3 pr-6 mobile:text-sm'
                                                )}
                                            value={{name, value}}
                                        >
                                            {({selected, active}) => (
                                                <>
                                                    <span
                                                        className={classNames(selected
                                                            ? 'font-bold'
                                                            : 'font-normal', 'block truncate')}>
                                                      {name}
                                                    </span>
                                                    {
                                                        selected &&
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-primary',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        ></span>
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

export default TaskStatusSelector;