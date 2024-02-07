'use client';

import CommonPagination from "@/components/ui/CommonPagination"
import PostCard from "../postCard/PostCard"
import {useRecoilValue} from "recoil";
import React, {useState} from "react";
import {useSuspenseQuery} from "@tanstack/react-query";
import {PageResponseBody, PostCardInfo} from "@/utils/type";
import {getPostList} from "@/service/post/post";
import {postSearchValue, selectedPositionState, selectedTechStackState} from "@/store/post/PostStateStore";

const PostList = () => {
    const selectedTechStacks = useRecoilValue(selectedTechStackState);
    const selectedPosition = useRecoilValue(selectedPositionState);
    const searchValue = useRecoilValue(postSearchValue);
    const [pageNumber, setPageNumber] = useState(0);

    const {data} = useSuspenseQuery<PageResponseBody<PostCardInfo[]>, Error>({
        queryKey: ['postList', selectedTechStacks, selectedPosition, searchValue, pageNumber],
        queryFn: () => getPostList({
            techStacks: selectedTechStacks,
            position: selectedPosition,
            keyword: searchValue,
            page: pageNumber
        })
    });

    const {content: infos, totalPages} = data.data;

    return (
        <section className="mt-6 mobile:mt-2">
            {
                infos.length > 0 ? (
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
                            itemsCountPerPage={8}
                            totalItemsCount={totalPages}
                            pageRangeDisplayed={5}
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