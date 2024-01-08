import { PositionItem, TechStackWithCategory } from "@/utils/type";
import { atom } from "recoil";

// 탭메뉴 게시글 <-> 내프로젝트 전환
export const activeTabState = atom<boolean>({
  key: "activeTabState",
  default: false,
});

// 기술스택 드롭박스 선택값
export const selectedTechStackState = atom<TechStackWithCategory[]>({
  key: "selectedTechStackState",
  default: []
});

// 포지션 드롭박스 선택값
export const selectedPositionState = atom<PositionItem | null>({
  key: "selectedPositionState",
  default: null
});

// 게시글 검색값
export const postSearchValue = atom<string>({
  key: "postSearchValue",
  default: ""
});