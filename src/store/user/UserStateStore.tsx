import {atom} from "recoil";

export const userStateStore = atom<string | null>({
    key: 'userStateStore',
    default: null
})