import {useQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getMilestone} from "@/service/project/milestone";

export default function useMilestone(milestoneId: string) {
    const {data, isFetching} = useQuery<ResponseBody<MilestoneInfo>, Error, ResponseBody<MilestoneInfo>>({
        queryKey: ['milestoneList'],
        queryFn: () => getMilestone(milestoneId),
        staleTime: 0
    });

    return {milestoneInfo: data?.data || null, isFetching};
}