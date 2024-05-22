'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useQuery} from "@tanstack/react-query";
import {ProjectMember, ResponseBody} from "@/utils/type";
import {getProjectCrewList} from "@/service/project/crews";

export default function useProjectCrewList() {
    const projectId = useQueryString('projectId');
    const {data:res, isFetching} = useQuery<ResponseBody<Record<'projectMembers', ProjectMember[]>>, Error>({
        queryKey: ['crewList', projectId],
        queryFn: () => getProjectCrewList({projectId})
    });

    return {crewList: res?.data.projectMembers || [], isFetching};
}