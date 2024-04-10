import {DataId, PointTypeValue, Position} from "@/utils/type";
import {
    ForceWDLOptionValueType,
    PROJECT_NOTICE_MENU,
    PROJECT_NOTICE_TYPE,
    RecruitOptionValueType
} from "@/app/project/@notice/_utils/constant";

/**
 * 프로젝트 알림타입 index
 */
export type ProjectNoticeTypeKey = keyof typeof PROJECT_NOTICE_TYPE;

/**
 * 프로젝트 알림메뉴 Index
 */
export type ProjectNoticeMenuKey = keyof typeof PROJECT_NOTICE_MENU;
export type ProjectNoticeMenuName = (typeof PROJECT_NOTICE_MENU)[ProjectNoticeMenuKey]["name"];
export type ProjectNoticeMenuValue = (typeof PROJECT_NOTICE_MENU)[ProjectNoticeMenuKey]["value"];

/**
 * 프로젝트 알림 기본데이터
 */
export type Notice = {
    type: ProjectNoticeTypeKey;
    alertId: DataId;
    checkUserId: DataId;
    sendUserId: DataId;
    milestoneId: DataId | null;
    projectId: DataId;
    workId: DataId | null;
    createDate: string;
    updateDate: string;
    content: string;
    position: Position | null;
    checkedStatus: boolean;
}


/**
 * 프로젝트 크루알림 데이터
 */
export type ProjectNoticeCrew = Notice;

/**
 * 프로젝트 업무알림 데이터
 */
export type ProjectNoticeTask = Notice & {
    scoreTypeId: PointTypeValue | null;
}

/**
 * 프로젝트 모집알림 데이터
 */
export type ProjectNoticeRecruit = Notice & {
    isPermit: RecruitOptionValueType;
}

/**
 * 프로젝트 크루 강제탈퇴 알림 데이터
 */
export type ProjectNoticeCrewFWDL = Notice & {
    withdrawConfirm : ForceWDLOptionValueType
}
