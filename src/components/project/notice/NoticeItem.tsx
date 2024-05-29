import React from 'react';
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {useSetRecoilState} from "recoil";
import {
    projectNoticeCurrentFormState,
} from "@/store/project/notice/ProjectNoticeStateStore";
import {snackbarState} from "@/store/CommonStateStore";
import ManagerCheckIcon from "@/components/project/notice/ManagerCheckIcon";
import {
    Notice,
    ProjectNoticeTypesKey
} from "@/app/project/@notice/_utils/type";

function NoticeItem({item, isAuthorized}: { item: Notice, isAuthorized:boolean }) {
    const setSnackbar = useSetRecoilState(snackbarState);
    const {type, alertId, content, createDate, checkedStatus} = item;
    const setCurrentNoticeForm = useSetRecoilState(projectNoticeCurrentFormState);

    function onClickHandler(type: ProjectNoticeTypesKey) {
        switch (type) {
            case 'WORK':
                if (!isAuthorized) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if (checkedStatus) setSnackbar({show: true, type: 'INFO', content: '업무 평가가 완료된 상태입니다.'});
                else {
                    setCurrentNoticeForm({...item});
                }
                break;
            case 'RECRUIT':
                if (!isAuthorized) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if (checkedStatus) setSnackbar({show: true, type: 'INFO', content: '지원자 검토가 완료된 상태입니다.'});
                else {
                    setCurrentNoticeForm({...item});
                }
                break;
            case 'CREW_CONFIRM':
            case 'ADD':
                setCurrentNoticeForm({...item});
                break;
            case 'FORCEWITHDRAWAL':
            case 'WITHDRAWAL':
                if (!isAuthorized) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if (checkedStatus) setSnackbar({show: true, type: 'INFO', content: '탈퇴 검토가 완료된 상태입니다.'});
                else {
                    setCurrentNoticeForm({...item});
                }
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
                <NoticeBadge size='sm' noticeType={type}/>
                {content}
                {type !== 'ADD' && <ManagerCheckIcon isChecked={checkedStatus}/>}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;