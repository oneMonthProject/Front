'use client';

import CommonPagination from "@/components/ui/CommonPagination"
import PostCard from "../postCard/PostCard"
import { useRecoilValue } from "recoil";
import { postSearchValue, selectedPositionState, selectedTechStackState } from "@/store/MainStateStore";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageResponseBody, PostCardInfo } from "@/utils/type";
import { getPostList } from "@/service/post";

const PostList = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const selectedPosition = useRecoilValue(selectedPositionState);
  const searchValue = useRecoilValue(postSearchValue);
  const [pageNumber, setPageNumber] = useState(0);

  const { data } = useSuspenseQuery<PageResponseBody<PostCardInfo[]>, Error>({
    // key 에 나머지 항목도 추가하기
    queryKey: ['postInfo', selectedPosition, searchValue, pageNumber],
    queryFn: () => getPostList({ technologyIds: [], position: selectedPosition, keyword: searchValue, page: pageNumber })
  });

  const { content: infos, totalPages } = data.data;

  return (
    <>
      <div className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-6 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
        {infos.length > 0 && infos.map((info) => (
          <PostCard key={info.boardId.toString()} postInfo={info} />
        ))}
      </div>
      {/*<CommonPagination />*/}
    </>
  )
}

export default PostList;