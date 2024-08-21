import React from 'react';
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {Notice} from "@/app/project/@notice/_utils/type";
import {AlertType} from "@/service/project/alert/constant";
import ManagerCheckIcon from "@/components/project/alert/ManagerCheckIcon";

type TaskAlertListItemProps = {
    data: Notice;
    isAuthorized: boolean;
}

function TaskAlertListItem({data}: TaskAlertListItemProps) {
    const {alertId, content, createDate, checkedStatus, projectId, checkUserId} = data;

    const onClickAlertListItemHandler = () => {

    }

    return (
        <li
            key={alertId}
            className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
            onClick={onClickAlertListItemHandler}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge size='sm' noticeType={AlertType.PRA3001}/>
                {content}
                <ManagerCheckIcon isChecked={checkedStatus}/>
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default TaskAlertListItem;