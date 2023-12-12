'use client';
import {getCookie} from "cookies-next";
import {useQueryString} from "@/hooks/useQueryString";
import {useQuery} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";

export function useProjectInfo() {
    const accessToken = getCookie('accessToken');
    const projectId = useQueryString('projectId');

    async function getInfo(){
        const res =  await getMyProjectDetail({accessToken: accessToken, projectId});
        return res;
    }

    const data = useQuery<ProjectInfo,Error>({
        queryKey: ['projectInfo'],
        queryFn: getInfo
    });

    return data;
}