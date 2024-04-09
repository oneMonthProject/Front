'use client';

import {useQueryString} from "@/hooks/useQueryString";
import {useQuery} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";

export function useProjectInfo(projectId = null) {

    const projectIdFromQueryParam = useQueryString('projectId');
    const id = projectId == null ? projectIdFromQueryParam : projectId;

    const {data, isFetching} = useQuery<Promise<ResponseBody<ProjectInfo>>,Error, ResponseBody<ProjectInfo>>({
        queryKey: ['projectInfo'],
        queryFn: () => getMyProjectDetail(id)
    });


    return {data: data!.data, isFetching};
}