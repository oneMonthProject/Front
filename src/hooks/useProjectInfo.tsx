'use client';
import {useQueryString} from "@/hooks/useQueryString";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getMyProjectDetail} from "@/service/project";
import {ProjectInfo, ResponseBody} from "@/utils/type";
import {useSetRecoilState} from "recoil";
import {projectUserAuthStateStore} from "@/store/project/crews/ProjectUserAuthStateStore";

export function useProjectInfo() {
    const setProjectUserAuthState = useSetRecoilState(projectUserAuthStateStore);
    const projectId = useQueryString('projectId');

    const res = useSuspenseQuery<ResponseBody<ProjectInfo>,Error>({
        queryKey: ['projectInfo'],
        queryFn: () => getMyProjectDetail(projectId)
    });

    const data = res.data.data;

    const {authMap:{milestoneAuth, workAuth}} = data;
    setProjectUserAuthState({milestoneAuth, workAuth});


    return data;
}