'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";
import {ProjectMember, ResponseBody} from "@/utils/type";
import {getProjectCrewList} from "@/service/project/crews";

export default function useProjectCrewList(){
    const projectId = useQueryString('projectId');
    const {data} = useSuspenseQuery<ResponseBody<Record<'projectMembers',ProjectMember[]>>, Error>({
        queryKey:['crewList', projectId],
        queryFn: () => getProjectCrewList({projectId})
    });

    return data.data;
}