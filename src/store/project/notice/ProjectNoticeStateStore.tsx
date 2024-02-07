import {atom, selector} from "recoil";
import {Notice, NoticeTypeKey, PointTypeValue, Position} from "@/utils/type";


/**
 * 크루 알림 form 상태
 */
export interface ProjectNoticeCrewFormState extends Notice {
    type: NoticeTypeKey;
    alertId: bigint;
    checkUserId: bigint;
    sendUserId: bigint;
    milestoneId: bigint | null;
    projectId: bigint;
    workId: bigint | null;
    createDate: string;
    updateDate: string;
    content: string;
    position: Position | null;
}

export class ProjectNoticeCrewForm implements ProjectNoticeCrewFormState {
    alertId: bigint;
    checkUserId: bigint;
    content: string;
    createDate: string;
    milestoneId: bigint | null;
    position: Position | null;
    projectId: bigint;
    sendUserId: bigint;
    type: NoticeTypeKey;
    updateDate: string;
    workId: bigint | null;

    constructor(notice: Notice) {
        const {
            type,
            alertId,
            checkUserId,
            sendUserId,
            milestoneId,
            projectId,
            workId,
            createDate,
            updateDate,
            content,
            position
        } = notice;

        this.type = type;
        this.alertId = alertId;
        this.checkUserId = checkUserId;
        this.sendUserId = sendUserId;
        this.milestoneId = milestoneId;
        this.projectId = projectId;
        this.workId = workId;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.content = content;
        this.position = position;
    }


}

/**
 * 업무 알림 form 상태
 */
interface ProjectNoticeTaskFormState extends Notice {
    scoreTypeId: PointTypeValue | null;
}

export class ProjectNoticeTaskForm implements ProjectNoticeTaskFormState {
    alertId: bigint;
    checkUserId: bigint;
    content: string;
    createDate: string;
    milestoneId: bigint | null;
    position: Position | null;
    projectId: bigint;
    sendUserId: bigint;
    type: NoticeTypeKey;
    updateDate: string;
    workId: bigint | null;
    scoreTypeId: PointTypeValue | null;

    constructor(notice: Notice, scoreTypeId: PointTypeValue | null) {
        const {
            type,
            alertId,
            checkUserId,
            sendUserId,
            milestoneId,
            projectId,
            workId,
            createDate,
            updateDate,
            content,
            position,
        } = notice;

        this.type = type;
        this.alertId = alertId;
        this.checkUserId = checkUserId;
        this.sendUserId = sendUserId;
        this.milestoneId = milestoneId;
        this.projectId = projectId;
        this.workId = workId;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.content = content;
        this.position = position;
        this.scoreTypeId = scoreTypeId;
    }


}

/**
 * 모집 알림 form 상태
 */
interface ProjectNoticeRecruitFormState extends Notice {
    isPermit: boolean | '';
}

export class ProjectNoticeRecruitForm implements ProjectNoticeRecruitFormState {
    alertId: bigint;
    checkUserId: bigint;
    content: string;
    createDate: string;
    isPermit: boolean | '';
    milestoneId: bigint | null;
    position: Position | null;
    projectId: bigint;
    sendUserId: bigint;
    type: NoticeTypeKey;
    updateDate: string;
    workId: bigint | null;

    constructor(isPermit: boolean | '', notice: Notice) {
        this.isPermit = isPermit;
        const {
            type,
            alertId,
            checkUserId,
            sendUserId,
            milestoneId,
            projectId,
            workId,
            createDate,
            updateDate,
            content,
            position
        } = notice;

        this.type = type;
        this.alertId = alertId;
        this.checkUserId = checkUserId;
        this.sendUserId = sendUserId;
        this.milestoneId = milestoneId;
        this.projectId = projectId;
        this.workId = workId;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.content = content;
        this.position = position;
    }

}

/**
 * 현재 알림 form 상태 관리
 */
export const projectNoticeCurrentFormState = atom<null | ProjectNoticeCrewFormState | ProjectNoticeTaskFormState | ProjectNoticeRecruitFormState>({
    key: 'projectNoticeCurrentFormState',
    default: null
});


/**
 * 현재 알림 modal selector
 */
interface ProjectNoticeModalState {
    isOpen: boolean;
    title: string;
}

export const projectNoticeModalStateSelector = selector<ProjectNoticeModalState>({
    key: 'projectNoticeModalStateSelector',
    get: ({get}) => {
        const currentFormState = get(projectNoticeCurrentFormState);
        let title = '';

        if (currentFormState !== null) {
            switch (currentFormState?.type) {
                case 'WORK' :
                    title = '업무 알림';
                    break;
                case 'RECRUIT':
                    title = '모집 알림';
                    break;
                case 'ADD':
                case 'WITHDRAWL':
                case 'FORCEWITHDRAWL':
                    title = '크루 알림';
                    break;
                default:
                    throw Error('Unknown Project Notice Form Type');
            }
        }

        return {isOpen: currentFormState !== null, title: title};
    }
})





