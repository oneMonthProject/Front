'use client';
import {getCookie} from "cookies-next";
import {useQueryString} from "@/hooks/useQueryString";
import {useQuery} from "@tanstack/react-query";
import {getMyProjectDetail as getMyProjectDetailAPI} from "@/service/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";

export function useProjectInfo() {
    const accessToken = getCookie('accessToken');
    const projectId = useQueryString('projectId');

    async function getMyProjectDetail(){
       return await getMyProjectDetailAPI({accessToken: accessToken, projectId});
    }

    const res = useQuery<ResponseBody<ProjectInfo>,Error>({
        queryKey: ['projectInfo'],
        queryFn: getMyProjectDetail
    });

    return res;
}