'use client';
import React, {useEffect} from "react";
import ProjectCard from "../projectCard/ProjectCard";
import {useQuery} from "@tanstack/react-query";
import {getMyProjectList as getMyProjectListApi} from "@/service/project";
import {getCookie} from "cookies-next";
import {ProjectInfo, ProjectPost, ResponseBody} from "@/utils/type";
import CommonPagination from "@/components/ui/CommonPagination";

async function getMyProjectList() {
    const accessToken = getCookie('accessToken');
    return await getMyProjectListApi({accessToken});
}

function MyProjectPosts() {

    const {data, isLoading, error} = useQuery<ResponseBody<ProjectPost[]>, Error>({
        queryKey: ['projectList'],
        queryFn: getMyProjectList
    });

    if (isLoading) return <div>loading..</div>;
    if (error) return <div>error</div>;

    const projectPosts = data!.data;

    // startDate기준 오름차순 정렬
    const sortedPosts = projectPosts.sort(function (a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }).reverse();


    return (
        <section className='my-10'>
            <ul
                className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
                {
                    sortedPosts?.map(v => (
                        <li
                            key={v.projectId}
                            className="flex-col w-[280px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:shadow-none mobile:rounded-none mobile:border-none mobile:mt-2">
                            <ProjectCard projectPost={v}/>
                        </li>
                    ))}
            </ul>
            <CommonPagination/>
        </section>
    );
}

export default MyProjectPosts;
