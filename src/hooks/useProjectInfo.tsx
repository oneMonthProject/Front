'use client';

import {useQuery} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";

export function useProjectInfo(projectId:string) {
    const {data, isFetching} = useQuery<Promise<ResponseBody<ProjectInfo>>,Error, ResponseBody<ProjectInfo>>({
        queryKey: ['projectInfo'],
        queryFn: () => getMyProjectDetail(projectId)
    });


    return {data: data?.data || null, isFetching};
}