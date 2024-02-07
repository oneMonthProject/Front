import { PositionItem, TechStackWithCategory } from "@/utils/type";
import { isEqual } from "lodash";
import {request} from "@/service/project/request";

export interface SearchParams {
  techStacks: TechStackWithCategory[];
  position: PositionItem | null;
  keyword: string;
  page: number;
}

interface Post {
  title: string;
  content: string;
  contact: string;
  positionIds: bigint[];
}

interface Project {
  name: string;
  subject: string;
  trustGradeId: bigint;
  crewNumber: number;
  startDate: string;
  endDate: string;
  technologyIds: bigint[];
}
export interface CreatePostInfo {
  board: Post;
  project: Project;
}

const createQueryParams = (params: SearchParams) => {
  const { techStacks, position, keyword, page } = params;
  const queryParams = new URLSearchParams();

  techStacks.forEach((stack) =>
    queryParams.append("technologyIds", stack.techStackId.toString())
  );
  if (position) {
    queryParams.append("positionId", position.positionId.toString());
  }
  if (!isEqual(keyword, "")) {
    queryParams.append("keyword", keyword);
  }
  queryParams.append("page", page.toString());

  return decodeURI(queryParams.toString());
};

export const getPostList = async (params: SearchParams) => {
  const queryParams = createQueryParams(params);
  return await request('GET',`/api/post/search?${queryParams}`);

};

export const getPost = async (postId: bigint) => {
  return await request('GET',`/api/post?postId=${postId}`);
};

export const createPost = async (createData: CreatePostInfo) => {
  return await request('POST',`/api/post`, {createData});
};

export const changeRecruitmentStatus = async (boardId: bigint) => {
  return await request('PATCH',`/api/post/recruitment-status?boardId=${boardId}`);
};
