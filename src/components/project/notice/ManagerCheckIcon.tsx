import React from 'react';
import {FaUserCheck} from "@react-icons/all-files/fa/FaUserCheck";
import {ProjectNoticeTypeKey} from "@/app/project/@notice/_utils/type";

interface ManagerCheckIconProps {
    isChecked: boolean;
    alertType: ProjectNoticeTypeKey;
}

function ManagerCheckIcon({isChecked, alertType}: ManagerCheckIconProps) {
    return alertType !== 'ADD' &&
        (
            <FaUserCheck size={20} className={isChecked ? 'text-primary' : 'text-grey400'}/>
        );
}

export default ManagerCheckIcon;