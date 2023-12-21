'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getProjectCrewList} from "@/service/project";

export default function useProjectCrewList(){
    const projectId = useQueryString('projectId');
    const {data} = useSuspenseQuery({
        queryKey:['crewList', projectId],
        queryFn: () => getProjectCrewList({projectId})
    });

    return data.data;
}