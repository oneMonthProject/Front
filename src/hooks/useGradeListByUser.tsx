'use client';

import {useQuery} from "@tanstack/react-query";
import {ResponseBody, TrustGradeItem} from "@/utils/type";
import {getTrustGradeListByUser} from "@/service/user/user";

export default function useGradeListByUser(){
    const {
        data,
        isFetching,
        isError
    } = useQuery<Promise<ResponseBody<TrustGradeItem[]>>, Error, ResponseBody<TrustGradeItem[]>>({
        queryKey: ['trustGradeListByUser'],
        queryFn: () => getTrustGradeListByUser()
    });

    return {gradeList:data?.data || [], isFetching, isError};
}