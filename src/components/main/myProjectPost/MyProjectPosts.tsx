'use client';
import React, {useState} from "react";
import ProjectCard from "../projectCard/ProjectCard";
import {useQuery} from "@tanstack/react-query";
import {getMyProjectList} from "@/service/project/project";
import {PageResponseBody, ProjectPost} from "@/utils/type";
import CommonPagination from "@/components/ui/CommonPagination";
import {sortByStartDate} from "@/utils/common";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import PostListSkeleton from "@/components/main/PostListSkeleton";


function MyProjectPosts() {
    const [pageNumber, setPageNumber] = useState(0);

    const {data, isFetching} = useQuery<Promise<PageResponseBody<ProjectPost[]>>, Error, PageResponseBody<ProjectPost[]>>({
        queryKey: ['myProjectList', pageNumber],
        queryFn: () => getMyProjectList(pageNumber, 8),
        staleTime: 0
    });

    if(isFetching) return <PostListSkeleton itemCount={8}/>;

    function onChangePageHandler(pageNumber: number) {
        setPageNumber(pageNumber);
    }

    const projectPosts = data!.data.content;

    return (
        <section className='my-10'>
            {
                projectPosts.length > 0 ?
                    (
                        <>
                            <ul
                                className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
                                {
                                    sortByStartDate(projectPosts, 'desc').map(v => (
                                        <li
                                            key={v.projectId}
                                            className="flex-col w-[280px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-2">
                                            <ProjectCard projectPost={v}/>
                                        </li>
                                    ))
                                }
                            </ul>
                            <CommonPagination
                                activePage={pageNumber}
                                itemsCountPerPage={ITEM_COUNT.CARDS}
                                totalItemsCount={projectPosts.length}
                                pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                                onChangePageHandler={onChangePageHandler}
                            />
                        </>
                    )
                    : (
                        <div className='flex items-center justify-center w-full h-[280px] bg-ground100 text-center rounded-md'>
                            <p className='py-10 mobile:text-2xl tablet:text-3xl font-medium text-grey900'>참여하고 있는 프로젝트가 없습니다.</p>
                        </div>
                    )
            }


        </section>
    );
}

export default MyProjectPosts;
