import {useQuery} from "@tanstack/react-query";
import {ResponseBody} from "@/utils/type";
import {getProjectSettingInfo, ProjectSettingInfoData} from "@/service/project/setting/info";

export default function useProjectSettingInfo(projectId: bigint) {
    const {
        data,
        isFetching
    } = useQuery<Promise<ResponseBody<ProjectSettingInfoData>>, Error, ResponseBody<ProjectSettingInfoData>>({
        queryKey: ['projectSettingInfo'],
        queryFn: () => getProjectSettingInfo(projectId),
        staleTime: 0
    });

    return {data, isFetching};
}