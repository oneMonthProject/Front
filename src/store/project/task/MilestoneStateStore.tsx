import {atom, selector} from "recoil";
import {MilestoneInfo, ModalState} from "@/utils/type";
import {convertStringToDate} from "@/utils/common";


interface MilestoneActiveState {
    activeId: bigint | null;
}

export const milestoneActiveStateStore = atom<MilestoneActiveState>({
    key: 'milestoneActiveStateStore',
    default: {
        activeId: null
    }
})


export interface MilestoneModalFormState extends MilestoneInfo {
    type: "add" | "modify";
}

export class MilestoneModalForm implements MilestoneModalFormState {
    type: "add" | "modify";
    mileStoneId: bigint;
    content: string;
    createDate: string;
    startDate: string;
    endDate: string;
    updateDate: string;
    progressStatus: string;
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