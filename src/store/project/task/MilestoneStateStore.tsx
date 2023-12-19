import {atom, selector} from "recoil";
import {ModalState} from "@/utils/type";

interface MilestoneActiveState {
    activeId: bigint | null;
}

export const milestoneActiveStateStore = atom<MilestoneActiveState>({
    key: 'milestoneActiveStateStore',
    default: {
        activeId: null
    }
})




export interface MilestoneState {
    type: "add" | "modify";
    id: string | bigint | null;
    content: string;
    startDate: string | null;
    endDate: string | null;
    updateDate: string | null;
}

export class MilestoneForm implements MilestoneState {
    type: "add" | "modify";
    id: string | bigint | null;
    content: string;
    startDate: string | null;
    endDate: string | null;
    updateDate: string | null;

    constructor(type: 'add' | 'modify', id: string | bigint | null, content: string, startDate: string | null, endDate: string | null, updateDate: string | null) {
        this.type = type;
        this.id = id;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updateDate = updateDate;
    }
}

export const milestoneModalFormState = atom<null | MilestoneState>({
    key: 'milestoneModalFormState',
    default: null
});

export const milestoneModalStateSelector = selector<ModalState>({
    key: 'milestoneModalStateSelector',
    get: ({ get }) => {
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

        return { isOpen: state !== null, title: title };
    }
})