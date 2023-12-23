import { PositionItem } from "@/utils/type";
import { isEqual } from "lodash";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

export interface SearchParams {
  technologyIds: bigint[];
  position: PositionItem | null;
  keyWord: string;
  page: number;
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
    }
  );

  return response.json();
};
