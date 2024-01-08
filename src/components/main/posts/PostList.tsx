'use client';

import CommonPagination from "@/components/ui/CommonPagination"
import PostCard from "../postCard/PostCard"
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageResponseBody, PostCardInfo } from "@/utils/type";
import { getPostList } from "@/service/post/post";
import { postSearchValue, selectedPositionState, selectedTechStackState } from "@/store/post/PostStateStore";

const PostList = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const selectedPosition = useRecoilValue(selectedPositionState);
  const searchValue = useRecoilValue(postSearchValue);
  const [pageNumber, setPageNumber] = useState(0);

  const { data } = useSuspenseQuery<PageResponseBody<PostCardInfo[]>, Error>({
    queryKey: ['postList', selectedTechStacks, selectedPosition, searchValue, pageNumber],
    queryFn: () => getPostList({ techStacks: selectedTechStacks, position: selectedPosition, keyword: searchValue, page: pageNumber })
  });

  const { content: infos, totalPages } = data.data;

  return (
    <>
      <div className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-6 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
        {infos.length > 0 && infos.map((info) => (
          <PostCard key={info.boardId.toString()} postInfo={info} />
        ))}
      </div>
      <CommonPagination activePage={pageNumber + 1} itemsCountPerPage={8} totalItemsCount={totalPages} pageRangeDisplayed={5} onChangePageHandler={(page) => setPageNumber(page - 1)} />
    </>
  )
}

export default PostList;