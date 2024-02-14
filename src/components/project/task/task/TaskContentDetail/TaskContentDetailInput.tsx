import React, {useState} from 'react';
import {MdModeEdit} from "@react-icons/all-files/md/MdModeEdit";
import {MdRemove} from "@react-icons/all-files/md/MdRemove";
import TaskContentDetailTool from "@/components/project/task/task/TaskContentDetail/TaskContentDetailTool";
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line";

function TaskContentDetailInput({initContents}:{initContents:string}) {
    const [todoContents, setTodoContents] = useState(() => initContents);
    const [placeholder, setPlaceholder] = useState('할 일 입력');

    return (
        <div
            className={`w-full flex items-center relative`}
        >

            <div
                className='w-full flex items-center text-3xl p-1 '>
                <div className={`relative ml-1 min-h-[2.3rem] ${todoContents.length === 0 && 'min-w-[6.8rem]'}`}>
                    <div className='relative flex items-center space-x-1 z-10'>
                        <div className='w-[320px] whitespace-nowrap text-transparent'>{todoContents}</div>
                    </div>
                    <input
                        type="text"
                        placeholder={placeholder}
                        className='w-[320px] absolute top-0 left-0 z-10 appearance-none border-none focus:border-transparent focus:ring-0 focus:outline-none'
                        onChange={(e) => {
                            // if (onChangeHandler !== undefined) onChangeHandler(e.target.value);
                            if (e.target.value === "") setPlaceholder('할 일 입력');
                            setTodoContents(e.target.value);
                        }}
                        spellCheck={false}
                        value={todoContents}
                        readOnly={false}
                        maxLength={30}
                    />

                </div>
            </div>
            <div
                className={`w-full flex space-x-3 mx-1 text-3xl text-neutral-dark `}>
                <button type='button'>
                    <MdModeEdit size={23}/>
                </button>
                <button type='button' onClick={()=> {}}>
                    <RiDeleteBin6Line size={23}/>
                </button>
            </div>
        </div>
    );
}

export default TaskContentDetailInput;