'use client';
import {useQuery} from "@tanstack/react-query";
import {getTechStackList as getTechStackListAPI} from "@/service/setting";
import {ResponseBody, TechStackItem} from "@/utils/type";

export function useTechStackList() {
  const { data, isFetching, isError } = useQuery<Promise<ResponseBody<TechStackItem[]>>, Error, ResponseBody<TechStackItem[]>>({
    queryKey: ['techStacks'],
    queryFn: getTechStackListAPI
  });

  return {data:data?.data, isFetching, isError};
}