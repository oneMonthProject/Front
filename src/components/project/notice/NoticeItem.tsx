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
import {snackbarState} from "@/store/CommonStateStore";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import ManagerCheckIcon from "@/components/project/notice/ManagerCheckIcon";

function NoticeItem({item}: { item: Notice }) {
    const {authMap:{milestoneAuth}} = useProjectInfo();
    const [snackbar, setSnackbar] = useRecoilState(snackbarState);
    const {type, alertId, content, createDate, checkedStatus} = item;
    const setCurrentNoticeForm = useSetRecoilState(projectNoticeCurrentFormState);

    function onClickHandler(type: NoticeTypeKey) {
        switch (type) {
            case "WORK":
                if(!milestoneAuth) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if(checkedStatus) setSnackbar({show:true, type:'INFO', content:'업무 평가가 완료된 상태입니다.'});
                else setCurrentNoticeForm(new ProjectNoticeTaskForm(item, null));
                break;
            case "RECRUIT":
                if(!milestoneAuth) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
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
            className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
            onClick={() => onClickHandler(type)}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge size='sm' text={type}/>
                {content}
                <ManagerCheckIcon isChecked={checkedStatus} alertType={type}/>
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;