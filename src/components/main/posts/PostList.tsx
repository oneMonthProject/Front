'use client';

import CommonPagination from "@/components/ui/CommonPagination"
import PostCard from "../postCard/PostCard"
import {useRecoilValue} from "recoil";
import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {PageResponseBody, PostCardInfo} from "@/utils/type";
import {getPostList} from "@/service/post/post";
import {postSearchValue, selectedPositionState, selectedTechStackState} from "@/store/post/PostStateStore";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import PostListSkeleton from "@/components/main/PostListSkeleton";

const PostList = () => {
    const selectedTechStacks = useRecoilValue(selectedTechStackState);
    const selectedPosition = useRecoilValue(selectedPositionState);
    const searchValue = useRecoilValue(postSearchValue);
    const [pageNumber, setPageNumber] = useState(0);

    const {data, isLoading} = useQuery<PageResponseBody<PostCardInfo[]>, Error, PageResponseBody<PostCardInfo[]>>({
        queryKey: ['postList', selectedTechStacks, selectedPosition, searchValue, pageNumber],
        queryFn: () => getPostList({
            techStacks: selectedTechStacks,
            position: selectedPosition,
            keyword: searchValue,
            page: pageNumber
        })
    });

    if(isLoading) return <PostListSkeleton itemCount={8} />

    const infos = data?.data.content || [];
    const totalPages = data?.data.totalPages || 0;

    return (
        <section className="mt-6 mobile:mt-2">
            {
                data && data.data.content.length > 0 ? (
                    <>
                        <ul className='grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200'>
                            {
                                infos.map((info) => (
                                        <li
                                            key={info.boardId.toString()}
                                            className="flex-col w-[280px] max-h-[330px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-2"
                                        >
                                            <PostCard key={info.boardId.toString()} postInfo={info}/>
                                        </li>
                                    )
                                )

                            }
                        </ul>
                        <CommonPagination
                            activePage={pageNumber + 1}
                            itemsCountPerPage={ITEM_COUNT.CARDS}
                            totalItemsCount={totalPages}
                            pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                            onChangePageHandler={(page) => setPageNumber(page - 1)}/>
                    </>
                ) : (
                    <div
                        className='flex items-center justify-center w-full h-[280px] bg-ground100 text-center rounded-md'>
                        <p className='py-10 mobile:text-2xl tablet:text-3xl font-medium text-grey900'>게시글이 없습니다.</p>
                    </div>
                )
            }
        </section>
    )
}

export default PostList;