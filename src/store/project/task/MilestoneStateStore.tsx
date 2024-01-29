import {atom, selector} from "recoil";
import {MilestoneInfo, ModalState} from "@/utils/type";

export type MilestoneStatusName = '시작전' | '진행중' | '완료' | '만료';
export type MilestoneStatusCode = 'PS001' | 'PS002' | 'PS003' | 'PS004';

export interface MilestoneStatusItem {
    name: MilestoneStatusName;
    value: MilestoneStatusCode;
}

export const milestoneStatusItems: MilestoneStatusItem[] = [
    {
        name: '시작전',
        value: 'PS001'
    },
    {
        name: '진행중',
        value: 'PS002'
    },
    {
        name: '완료',
        value: 'PS003'
    },
    {
        name: '만료',
        value: 'PS004'
    },
];


export function getMilestoneStatus(str: MilestoneStatusName | MilestoneStatusCode | '') {
    if (str === '') return null;

    const milestoneStatusItem = str.charAt(0) === 'P' ?
        milestoneStatusItems.find(v => v.value === str)
        : milestoneStatusItems.find(v => v.name === str);

    if (!milestoneStatusItem) throw new Error('Unknown Milestone Status');
    return milestoneStatusItem;
}

export interface MilestoneActiveState {
    projectId: bigint;
    activeId: bigint | null;
    content: string;
    startDate: string;
    endDate: string;
    progressStatus: MilestoneStatusName;
    progressStatusCode: MilestoneStatusCode;
    slideIndex: number;
}

export const milestoneActiveStateStore = atom<MilestoneActiveState | null>({
    key: 'milestoneActiveStateStore',
    default: null
})


export interface MilestoneModalFormState extends MilestoneInfo {
    type: "add" | "modify";
    progressStatusCode: MilestoneStatusCode | '';
}

export class MilestoneModalForm implements MilestoneModalFormState {
    type: "add" | "modify";
    mileStoneId: bigint;
    content: string;
    createDate: string;
    startDate: string;
    endDate: string;
    updateDate: string;
    progressStatus: MilestoneStatusName | '';
    progressStatusCode: MilestoneStatusCode | '';
    projectId: bigint;

    constructor(type: 'add' | 'modify', milestoneInfo: MilestoneInfo) {
        const {
            mileStoneId
            , content
            , createDate
            , startDate
            , endDate
            , updateDate
            , progressStatus
            , projectId
        } = milestoneInfo;

        this.type = type;
        this.mileStoneId = mileStoneId;
        this.content = content;
        this.createDate = createDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updateDate = updateDate;
        this.progressStatus = progressStatus;
        this.progressStatusCode = getMilestoneStatus(progressStatus)?.value || '';
        this.projectId = projectId;

    }


}

export const milestoneModalFormState = atom<null | MilestoneModalFormState>({
    key: 'milestoneModalFormState',
    default: null
});

export const milestoneModalStateSelector = selector<ModalState>({
    key: 'milestoneModalStateSelector',
    get: ({get}) => {
        const state = get(milestoneModalFormState);

        let title = '';
        if (state !== null) {
            switch (state?.type) {
                case 'add':
                    title = '마일스톤 추가';
                    break;
                case 'modify':
                    title = '마일스톤 수정';
                    break;
                default:
                    throw Error('Unknown Project Notice Form Type');
            }
        }

        return {isOpen: state !== null, title: title};
    }
})