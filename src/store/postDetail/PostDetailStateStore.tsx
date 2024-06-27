import {atom} from "recoil";
import {PositionItem} from "@/utils/type";

export const selectRecruitPositionState = atom<PositionItem | null>({
    key:'selectRecruitPositionState',
    default: null
})