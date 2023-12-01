import {atom} from "recoil";

interface MilestoneState {
    activeId: string;
}

export const milestoneStateStore = atom<MilestoneState>({
    key: 'milestoneStateStore',
    default: {
        activeId: ''
    }
})