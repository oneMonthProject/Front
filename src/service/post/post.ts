import { PositionItem, TechStackWithCategory } from "@/utils/type";
import { isEqual } from "lodash";

const publicURL = process.env.NEXT_PUBLIC_URL;

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
  const response = await fetch(`${publicURL}/api/post/search?${queryParams}`);

  return await response.json();
};

export const getPost = async (postId: string) => {
  const response = await fetch(`${publicURL}/api/post?postId=${postId}`);
  return await response.json();
};

export const createPost = async (createData: CreatePostInfo) => {
  const response = await fetch(`${publicURL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createData),
  });

  return response.json();
};

export const changeRecruitmentStatus = async (boardId: bigint) => {
  const response = await fetch(
    `${publicURL}/api/post/recruitment-status?boardId=${boardId}`,
    {
      method: "PATCH",
    }
  );

  return response.json();
};
