import { DropDownItem, SnackbarState } from "@/utils/type";
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
export const selectedPositionState = atom<DropDownItem | null>({
  key: "selectedPositionState",
  default: null
});

export const snackbarState = atom<SnackbarState>({
  key: "snackbarState",
  default: { show: false, type: "INFO", content: "" }
});