'use client';
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPositionList as getPositionListAPI } from "@/service/setting";
import { PositionItem, ResponseBody } from "@/utils/type";

export function usePositionList() {
  const { data } = useSuspenseQuery<ResponseBody<PositionItem[]>, Error>({
    queryKey: ['positions'],
    queryFn: getPositionListAPI
  });

  return data.data;
}