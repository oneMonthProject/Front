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
        isRefetching,
        isPending,
        dataUpdatedAt
    } = useQuery<Promise<ResponseBody<PositionItem[]>>, Error, ResponseBody<PositionItem[]>>({
        queryKey: ['positions'],
        queryFn: () => getPositionListAPI(),
        refetchOnMount: 'always'
    });

    console.log("position dataUpdateAt: ", dataUpdatedAt)
    console.log("position isPending: ", isPending);
    console.log("positionisStale: ", isStale);
    console.log("position isRefetching: ", isRefetching);
    console.log("position isFetchedAfterMount: ", isFetchedAfterMount);

    if (isError) setSnackBar({show: true, type: 'ERROR', content: '포지션 목록을 가져올 수 없습니다'});

    return {data: data?.data || [], isFetching, isError};
}