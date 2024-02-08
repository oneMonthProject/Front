import React from 'react';
import {Notice, NoticeTypeKey} from "@/utils/type";
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    ProjectNoticeCrewForm,
    projectNoticeCurrentFormState,
    ProjectNoticeRecruitForm,
    ProjectNoticeTaskForm
} from "@/store/project/notice/ProjectNoticeStateStore";
import {FaUserCheck} from "@react-icons/all-files/fa/FaUserCheck";
import {snackbarState} from "@/store/CommonStateStore";

function NoticeItem({item}: { item: Notice }) {
    const [snackbar, setSnackbar] = useRecoilState(snackbarState);
    const {type, alertId, content, createDate, checkedStatus} = item;
    const setCurrentNoticeForm = useSetRecoilState(projectNoticeCurrentFormState);

    function onClickHandler(type: NoticeTypeKey) {
        switch (type) {
            case "WORK":
                if(checkedStatus) setSnackbar({show:true, type:'INFO', content:'업무 평가가 완료된 상태입니다.'});
                else setCurrentNoticeForm(new ProjectNoticeTaskForm(item, null));
                break;
            case "RECRUIT":
                if(checkedStatus) setSnackbar({show:true, type:'INFO', content:'지원자 검토가 완료된 상태입니다.'});
                else setCurrentNoticeForm(new ProjectNoticeRecruitForm('', item));
                break;
            case "CREW":
            case "ADD":
                setCurrentNoticeForm(new ProjectNoticeCrewForm(item));
                break;
            default:
                throw Error('Unknown Project Notice Type');
        }
    }

    return (
        <li
            key={alertId}
            className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer 
                        ${checkedStatus && (type === 'RECRUIT' || type === 'WORK') && 'bg-gray-100 border-b border-[#fff]'}`}
            onClick={() => onClickHandler(type)}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge size='sm' text={type}/>
                {content}
                {checkedStatus && (type === 'RECRUIT' || type === 'WORK') && <FaUserCheck size={20} className='text-primary'/>}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;