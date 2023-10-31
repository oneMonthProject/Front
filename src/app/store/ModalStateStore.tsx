import {atom} from "recoil";

interface ModalState {
    isOpen: boolean;
}

export const modalState = atom<ModalState>({
    key:'modalState',
    default:{
        isOpen:false
    }
})