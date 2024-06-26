'use client';
import {useQuery} from "@tanstack/react-query";
import {getPositionList as getPositionListAPI} from "@/service/setting";
import {PositionItem, ResponseBody} from "@/utils/type";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

export function usePositionList() {
    const setSnackBar = useSetRecoilState(snackbarState);

    const {
        data,
        isFetching,
        isError,
        isStale,
        isFetchedAfterMount,
        isRefetching
    } = useQuery<Promise<ResponseBody<PositionItem[]>>, Error, ResponseBody<PositionItem[]>>({
        queryKey: ['positions'],
        queryFn: () => getPositionListAPI(),
        refetchOnMount: 'always'
    });

    console.log("isStale: ", isStale);
    console.log("isRefetching: ", isRefetching);
    console.log("isFetchedAfterMount: ", isFetchedAfterMount);

    if (isError) setSnackBar({show: true, type: 'ERROR', content: '포지션 목록을 가져올 수 없습니다'});

    return {data: data?.data || [], isFetching, isError};
}