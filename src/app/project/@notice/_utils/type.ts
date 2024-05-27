import {DataId, Position} from "@/utils/type";
import {
    ForceWDLOptionValueType,
    PROJECT_NOTICE,
    PROJECT_NOTICE_TYPES,
    RecruitOptionValueType,
    TaskPointOptions
} from "@/app/project/@notice/_utils/constant";

/**
 * 프로젝트 알림
 */
export type ProjectNoticeKey = keyof typeof PROJECT_NOTICE;
export type ProjectNoticeTypesKey = keyof typeof PROJECT_NOTICE_TYPES;


/**
 * 프로젝트 알림 기본데이터
 */
export type Notice = {
    type: ProjectNoticeTypesKey;
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

export type PointTypeKey = keyof typeof TaskPointOptions;
export type PointTypeName = (typeof TaskPointOptions)[PointTypeKey]["name"];
export type PointTypeValue = (typeof TaskPointOptions)[PointTypeKey]["value"];
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
