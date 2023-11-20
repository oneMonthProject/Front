import { atom } from "recoil";

type PostPositionStateType = string[];

//게시글마다 필요한 모집직군
export const PostPositionState = atom<PostPositionStateType>({
  key: "activeTabState",
  default: ["프론트엔드", "백엔드"],
});
