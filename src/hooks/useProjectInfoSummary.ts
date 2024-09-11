import {useQuery} from "@tanstack/react-query";
import {ProjectInfoSummary, ResponseBody} from "@/utils/type";
import {getProjectSettingInfo, ProjectSettingInfoData} from "@/service/project/setting/info";
import {numStrToBigInt} from "@/utils/common";

export default function useProjectInfoSummary(projectId: string) {
    const {
        data,
        isFetching
    } = useQuery<Promise<ResponseBody<ProjectInfoSummary>>, Error, ResponseBody<ProjectInfoSummary>>({
        queryKey: ['projectInfoSummary', projectId],
        queryFn: () => getProjectSettingInfo(numStrToBigInt(projectId)),
    });

    return {data, isFetching};
}