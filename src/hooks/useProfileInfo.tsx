'use client';
import { useQuery } from "@tanstack/react-query";
import { getUserIfo as getProfileInfoAPI } from "@/service/user";
import { ProfileInfo, ResponseBody } from "@/utils/type";
import { getCookie } from "cookies-next";

export function useProfileInfo() {
  async function getProfileInfo() {
    // user 정보 cookie 에 저장하지 않을거라면 변경하기
    const userId = getCookie("user_id");
    if (userId) {
      return await getProfileInfoAPI(BigInt(userId));
    }

    return null;

    // test
    // return await getProfileInfoAPI(9007199254740992n);
  }

  const res = useQuery<ResponseBody<ProfileInfo>, Error>({
    queryKey: ['profileInfo'],
    queryFn: getProfileInfo
  });

  return res;
}