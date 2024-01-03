'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getProjectCrewList} from "@/service/project/project";
import {ProjectMember, ResponseBody} from "@/utils/type";

export default function useProjectCrewList(){
    const projectId = useQueryString('projectId');
    const {data} = useSuspenseQuery<ResponseBody<Record<'projectMembers',ProjectMember[]>>, Error>({
        queryKey:['crewList', projectId],
        queryFn: () => getProjectCrewList({projectId})
    });

    return data.data;
}