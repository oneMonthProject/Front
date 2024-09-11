import {useQuery} from "@tanstack/react-query";
import {getCrewAuthOptions} from "@/service/setting";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";

/**
 * 프로젝트 크루 권한 옵션 조회
 */
export default function useCrewOptionList() {
    const {data, isFetching} = useQuery<ResponseBody<ProjectAuthMap[]>, Error, ResponseBody<ProjectAuthMap[]>>({
        queryKey: ['crewOptionList'],
        queryFn: () => getCrewAuthOptions(),
    });

    const crewOptionList = data?.data || [];
    return {data: crewOptionList, isFetching};
}