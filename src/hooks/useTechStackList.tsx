'use client';
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTechStackList as getTechStackListAPI } from "@/service/setting";
import { TechStackItem, ResponseBody } from "@/utils/type";

export function useTechStackList() {
  const { data } = useSuspenseQuery<ResponseBody<TechStackItem[]>, Error>({
    queryKey: ['techStacks'],
    queryFn: getTechStackListAPI
  });

  return data.data;
}