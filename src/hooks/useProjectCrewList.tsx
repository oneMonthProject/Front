'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useQuery} from "@tanstack/react-query";
import {ProjectMember, ResponseBody} from "@/utils/type";
import {getProjectCrewList} from "@/service/project/crews";

export default function useProjectCrewList() {
    const projectId = useQueryString('projectId');
    const {data, isFetching} = useQuery<ResponseBody<ProjectMember[]>, Error>({
        queryKey: ['crewList', projectId],
        queryFn: () => getProjectCrewList({projectId})
    });

    return {data, isFetching};
}