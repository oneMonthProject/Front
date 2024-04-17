'use client';
import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import { getPositionList as getPositionListAPI } from "@/service/setting";
import { PositionItem, ResponseBody } from "@/utils/type";

export function usePositionList() {
  const { data, isFetching, isError } = useQuery<Promise<ResponseBody<PositionItem[]>>, Error,ResponseBody<PositionItem[]>>({
    queryKey: ['positions'],
    queryFn: getPositionListAPI
  });



  return {data:data?.data, isFetching, isError};
}