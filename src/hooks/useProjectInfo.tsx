'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";

export function useProjectInfo(projectId = null) {

    const projectIdFromQueryParam = useQueryString('projectId');
    const id = projectId == null ? projectIdFromQueryParam : projectId;

    const res = useSuspenseQuery<ResponseBody<ProjectInfo>,Error>({
        queryKey: ['projectInfo'],
        queryFn: () => getMyProjectDetail(id)
    });



    return res.data.data;
}