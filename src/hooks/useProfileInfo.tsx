'use client';
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserIfo } from "@/service/user/user";
import { ProfileInfo, ResponseBody } from "@/utils/type";

export function useProfileInfo() {
  const { data } = useSuspenseQuery<ResponseBody<ProfileInfo>, Error>({
    queryKey: ['profileInfo'],
    queryFn: getUserIfo
  });

  return data.data;
}