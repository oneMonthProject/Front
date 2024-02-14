import React from 'react';
import {MdRemove} from "@react-icons/all-files/md/MdRemove";
import {IoIosAddCircle} from "@react-icons/all-files/io/IoIosAddCircle";
import {MdCancel} from "@react-icons/all-files/md/MdCancel";

function TaskContentDetailTool() {
    return (
        <div
            className={`w-full opacity-100 flex space-x-1 mx-1`}>
            <button type='button' className='text-primary'>
                <IoIosAddCircle size={30}/>
            </button>
            <button type="button" className='text-red-700' onClick={()=> {}}>
                <MdCancel size={30}/>
            </button>
        </div>
    );
}

export default TaskContentDetailTool;