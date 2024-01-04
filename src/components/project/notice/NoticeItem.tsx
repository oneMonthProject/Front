import React from 'react';
import {Notice} from "@/utils/type";
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {useSetRecoilState} from "recoil";
import {
    ProjectNoticeCrewForm,
    projectNoticeCurrentFormState,
    ProjectNoticeRecruitForm,
    ProjectNoticeTaskForm
} from "@/store/project/notice/ProjectNoticeStateStore";

function NoticeItem({item}: { item: Notice }) {
    const {type, alertId, content, createDate} = item;
    const setCurrentNoticeForm = useSetRecoilState(projectNoticeCurrentFormState);

    function onClickHandler(type: string) {
        switch (type) {
            case '업무':
                setCurrentNoticeForm(new ProjectNoticeTaskForm(false, item));
                break;
            case '모집':
                setCurrentNoticeForm(new ProjectNoticeRecruitForm(false, item));
                break;
            case '크루':
                setCurrentNoticeForm(new ProjectNoticeCrewForm(item));
                break;
            default:
                throw Error('Unknown Project Notice Type');
        }
    }

    return (
        <li
            key={alertId}
            className="flex items-center gap-x-10 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer"
            onClick={() => onClickHandler(type)}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge size='sm' text={type}/>
                {content}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;