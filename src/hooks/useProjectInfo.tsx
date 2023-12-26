'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";

export function useProjectInfo() {

    const projectId = useQueryString('projectId');

    const res = useSuspenseQuery<ResponseBody<ProjectInfo>,Error>({
        queryKey: ['projectInfo'],
        queryFn: () => getMyProjectDetail(projectId)
    });



    return res.data.data;
}