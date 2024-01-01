import { PositionItem } from "@/utils/type";
import { isEqual } from "lodash";

const publicURL = process.env.NEXT_PUBLIC_URL;
const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

export interface SearchParams {
  technologyIds: bigint[];
  position: PositionItem | null;
  keyWord: string;
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
  const { technologyIds, position, keyWord, page } = params;
  const queryParams = new URLSearchParams();
  technologyIds.forEach((id) =>
    queryParams.append("technologyIds", id.toString())
  );
  if (position) {
    queryParams.append("positionId", position.positionId.toString());
  }
  if (!isEqual(keyWord, "")) {
    queryParams.append("keyWord", keyWord);
  }
  queryParams.append("page", page.toString());

  return queryParams.toString();
};

export const getPostList = async (params: SearchParams) => {
  const queryParams = createQueryParams(params);

  const response = await fetch(
    `${baseUrl}/api/board/search/public?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};

export const getPostDetail = async (postId: string) => {
  const response = await fetch(
    `${baseUrl}/api/board/${postId}/public`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
}