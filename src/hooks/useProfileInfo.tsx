'use client';
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserIfo as getProfileInfoAPI } from "@/service/user";
import { ProfileInfo, ResponseBody } from "@/utils/type";

export function useProfileInfo() {
  const { data } = useSuspenseQuery<ResponseBody<ProfileInfo>, Error>({
    queryKey: ['profileInfo'],
    queryFn: getProfileInfoAPI
  });

  return data.data;
}