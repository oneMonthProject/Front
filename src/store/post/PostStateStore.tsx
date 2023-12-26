import { atom } from "recoil";

interface PostModalState {
  isOpen: boolean;
  completeStatus: boolean;
}

export const postModalState = atom<PostModalState>({
  key: "postModalState",
  default: { isOpen: false, completeStatus: false }
})