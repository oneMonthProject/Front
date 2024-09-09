import {getMyProjectDetail} from "@/service/project/project";
import {useQuery} from "@tanstack/react-query";

export default function useProjectInfo(projectId: bigint, userId: bigint) {
    const {data, isFetching} = useQuery({
        queryFn: () => getMyProjectDetail(projectId, userId),
        queryKey: ['projectInfo', projectId, userId]
    });

    return {projectInfo: data?.data || null, isFetching};
}