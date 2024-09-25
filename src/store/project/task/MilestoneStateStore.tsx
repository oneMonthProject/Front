import {atom, DefaultValue, selector, selectorFamily} from "recoil";
import {MilestoneInfo, ModalState, ProjectAuthMap, ProjectAuthMapCode} from "@/utils/type";
import {MilestoneAddReqData, MilestoneModReqData} from "@/service/project/milestone";

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

type MilestoneActiveState = {
    activeMilestone: MilestoneInfo | null;
    activeMilestoneId: bigint | null;
    activeMilestoneIndex: number | null;
}

export const milestoneActiveStateStore = atom<MilestoneActiveState>({
    key: 'milestoneActiveState',
    default: {
        activeMilestone: null,
        activeMilestoneId: null,
        activeMilestoneIndex: null
    }
});


// * ============= Milestone Add ============= *

export const milestoneAddModalStateStore = atom<ModalState>({
    key: 'milestoneAddModalStateStore',
    default: {
        isOpen: false,
        title: '마일스톤 추가'
    }
});

export const milestoneAddDataStateStore = atom<MilestoneAddReqData>({
    key: 'milestoneAddDataStateStore',
    default: {
        projectId: 0n,
        startDate: '',
        endDate: '',
        content: '',
        authMap: ''
    }
});

export type MilestoneAddDataKey = keyof MilestoneAddReqData;
export type MilestoneAddDataField<T> = MilestoneAddReqData[Extract<MilestoneAddDataKey, T>];

export const milestoneAddDataStateSelector = selectorFamily({
    key: 'milestoneAddDataStateSelector',
    get: (param: MilestoneAddDataKey) => ({get}) => {
        const state = get(milestoneAddDataStateStore);
        return state[param] as MilestoneAddDataField<typeof param>;
    },
    set: (param: MilestoneAddDataKey) => ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const state = get(milestoneAddDataStateStore);
        const updated = {...state, [param]: newValue};
        set(milestoneAddDataStateStore, updated);
    }
});


// * ============= Milestone Mod ============= *

export const milestoneModModalStateStore = atom<ModalState>({
    key: 'milestoneModModalStateStore',
    default: {
        isOpen: false,
        title: '마일스톤 수정'
    }
});

export const milestoneModDataStateStore = atom<MilestoneModReqData>({
    key: 'milestoneModDataStateStore',
    default: {
        milestoneId: 0n,
        startDate: '',
        endDate: '',
        content: '',
        authMap: ''
    }
});

export type MilestoneModDataKey = keyof MilestoneModReqData;
export type MilestoneModDataField<T> = MilestoneModReqData[Extract<MilestoneModDataKey, T>];

export const milestoneModDataStateSelector = selectorFamily({
    key: 'milestoneModDataStateSelector',
    get: (param: MilestoneModDataKey) => ({get}) => {
        const state = get(milestoneModDataStateStore);
        return state[param] as MilestoneModDataField<typeof param>;
    },
    set: (param: MilestoneModDataKey) => ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const state = get(milestoneModDataStateStore);
        const updated = {...state, [param]: newValue};
        set(milestoneModDataStateStore, updated);
    }
});

