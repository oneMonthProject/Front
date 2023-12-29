'use client';
import React from "react";
import ProjectCard from "../projectCard/ProjectCard";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getMyProjectList} from "@/service/project/project";
import {ProjectPost, ResponseBody} from "@/utils/type";
import CommonPagination from "@/components/ui/CommonPagination";
import {sortByStartDate} from "@/utils/common";


function MyProjectPosts() {
    const {data} = useSuspenseQuery<ResponseBody<ProjectPost[]>, Error>({
        queryKey: ['myProjectList'],
        queryFn: getMyProjectList
    });

    const projectPosts = data!.data;

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
                            <CommonPagination/>
                        </>
                    )
                    : (
                        <div className='w-full bg-ground100 text-center rounded-md'>
                            <p className='py-10 text-2xl font-medium text-grey900'>참여하고 있는 프로젝트가 없습니다.</p>
                        </div>
                    )
            }


        </section>
    );
}

export default MyProjectPosts;
