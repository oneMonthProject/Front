import React from 'react';
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {useSetRecoilState} from "recoil";
import {
    ProjectNoticeCrewForm,
    ProjectNoticeCrewFWDLForm,
    projectNoticeCurrentFormState,
    ProjectNoticeRecruitForm,
    ProjectNoticeTaskForm
} from "@/store/project/notice/ProjectNoticeStateStore";
import {snackbarState} from "@/store/CommonStateStore";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import ManagerCheckIcon from "@/components/project/notice/ManagerCheckIcon";
import {
    Notice,
    ProjectNoticeCrewFWDL,
    ProjectNoticeRecruit,
    ProjectNoticeTask, ProjectNoticeTypeKey
} from "@/app/project/@notice/_utils/type";
import {PROJECT_NOTICE_TYPE as PNT} from "@/app/project/@notice/_utils/constant";

function NoticeItem({item}: { item: Notice }) {
    const setSnackbar = useSetRecoilState(snackbarState);
    const {type, alertId, content, createDate, checkedStatus} = item;
    const setCurrentNoticeForm = useSetRecoilState(projectNoticeCurrentFormState);

    const {data} = useProjectInfo();
    const {authMap: {milestoneAuth}} = data;

    function onClickHandler(type: ProjectNoticeTypeKey) {
        switch (type) {
            case PNT.WORK.value:
                if (!milestoneAuth) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if (checkedStatus) setSnackbar({show: true, type: 'INFO', content: '업무 평가가 완료된 상태입니다.'});
                else {
                    const form: ProjectNoticeTask = {...item, scoreTypeId: null};
                    const currentFormState: ProjectNoticeTaskForm = {name: type, form};
                    setCurrentNoticeForm(currentFormState);
                }
                break;
            case PNT.RECRUIT.value:
                if (!milestoneAuth) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if (checkedStatus) setSnackbar({show: true, type: 'INFO', content: '지원자 검토가 완료된 상태입니다.'});
                else {
                    const form: ProjectNoticeRecruit = {...item, isPermit: null};
                    const currentFormState: ProjectNoticeRecruitForm = {name: type, form};
                    setCurrentNoticeForm(currentFormState);
                }
                break;
            case PNT.CREW_CONFIRM.value:
            case PNT.ADD.value:
                setCurrentNoticeForm({name: type, form: item} as ProjectNoticeCrewForm);
                break;
            case PNT.FORCEWITHDRAWL.value:
                if (!milestoneAuth) {
                    setSnackbar({show: true, type: 'INFO', content: '알림 확인 권한이 없습니다.'});
                    return;
                }
                if (checkedStatus) setSnackbar({show: true, type: 'INFO', content: '탈퇴 검토가 완료된 상태입니다.'});
                else {
                    const form: ProjectNoticeCrewFWDL = {...item, withdrawConfirm: null};
                    const currentFormState: ProjectNoticeCrewFWDLForm = {name: type, form};
                    setCurrentNoticeForm(currentFormState);
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
                <ManagerCheckIcon isChecked={checkedStatus} alertType={type}/>
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;