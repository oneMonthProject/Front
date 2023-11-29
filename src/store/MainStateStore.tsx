import { atom } from "recoil";

//탭메뉴 게시글 <-> 내프로젝트 전환
export const activeTabState = atom<boolean>({
  key: "activeTabState",
  default: false,
});
//기술스택 드롭박스 선택값
export const selectedTechStackState = atom<string[]>({
  key: "selectedTechStackState",
  default: []
})
//포지션 드롭박스 선택값
export const selectedPositionState = atom({
  key: "selectedPositionState",
  default: "포지션",
});
