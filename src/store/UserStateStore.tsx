import { atom } from "recoil";

// 회원가입 - 직무 선택 값
export const positionState = atom<SelectItem | null>({
  key: "user-positionState",
  default: null
})

// 회원가입 - 관심 스택 선택 값
export const interestStackState = atom<SelectItem[]>({
  key: "user-interestStackState",
  default: [],
});