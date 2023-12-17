'use client';
import { useQuery } from "@tanstack/react-query";
import { getUserProjectHistory as getUserProjectHistoryAPI } from "@/service/user";
import { UserProjectHistory, ResponseBody } from "@/utils/type";

export function useUserProjectHistory(pageNumber: number) {
  async function getProfileInfo(pageNumber: number) {
    return await getUserProjectHistoryAPI(pageNumber);
  }

  const res = useQuery<ResponseBody<UserProjectHistory[]>, Error>({
    queryKey: ['profileInfo', pageNumber],
    queryFn: () => getProfileInfo(pageNumber)
  });

  return res;
}