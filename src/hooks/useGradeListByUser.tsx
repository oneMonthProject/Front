'use client';

import {useQuery} from "@tanstack/react-query";
import {ResponseBody, SelectItem, TrustGradeItem} from "@/utils/type";
import {getTrustGradeListByUser} from "@/service/user/user";
import {TrustGradeIdType} from "@/app/project/@setting/_utils/type";

export default function useGradeListByUser(trustGrade:SelectItem<string, TrustGradeIdType>){
    const {
        data,
        isFetching,
        status
    } = useQuery<Promise<ResponseBody<TrustGradeItem[]>>, Error, ResponseBody<TrustGradeItem[]>>({
        queryKey: ['trustGradeListByUser', trustGrade],
        queryFn: () => getTrustGradeListByUser()
    });

    return {gradeList:data?.data || [], isFetching};
}