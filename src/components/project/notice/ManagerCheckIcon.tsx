import React from 'react';
import {FaUserCheck} from "@react-icons/all-files/fa/FaUserCheck";


function ManagerCheckIcon({isChecked}: { isChecked: boolean }) {
    return (
        <FaUserCheck size={20} className={isChecked ? 'text-primary' : 'text-grey400'}/>
    );
}

export default ManagerCheckIcon;