import { atom } from "recoil";

//탭메뉴 게시글 <-> 내프로젝트 전환
export const activeTabState = atom<boolean>({
  key: "activeTabState",
  default: false,
});
//포지션 선택 드롭박스 열림/닫힘
export const positionDropdownState = atom<boolean>({
  key: "positionDropdownState",
  default: false,
});
//기술스택 선택 드롭박스 열림/닫힘
export const techstackDropdownState = atom<boolean>({
  key: "techstackDropdownState",
  default: false,
});
//포지션 드롭박스 선택값
export const selectedPositionState = atom({
  key: "selectedPositionState",
  default: "포지션",
});
