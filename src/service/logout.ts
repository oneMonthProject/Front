import authApi from "@/utils/authApi";
import { removeCookie } from "@/utils/cookies";

export const logout = async () => {
  const response = await authApi("/api/user/logout");

  // 여기서 처리할 지 아니면 다른 곳에서 할 지 생각해보기
  if (response.ok) {
    removeCookie("user_id");
    removeCookie("access_token");
    removeCookie("refresh_token");
  }

  return response.json();
};
