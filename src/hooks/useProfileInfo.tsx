'use client';
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserIfo as getProfileInfoAPI } from "@/service/user";
import { ProfileInfo, ResponseBody } from "@/utils/type";

export function useProfileInfo() {
  async function getProfileInfo() {
    return await getProfileInfoAPI();
  }

  const res = useSuspenseQuery<ResponseBody<ProfileInfo>, Error>({
    queryKey: ['profileInfo'],
    queryFn: getProfileInfo
  });

  return res;
}