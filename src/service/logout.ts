import authApi from "@/utils/authApi";
import { deleteCookie } from "cookies-next";

export const logout = async () => {
  const response = await authApi("/api/user/logout");

  // 여기서 처리할 지 아니면 다른 곳에서 할 지 생각해보기
  // Home 으로 이동 추가
  if (response.ok) {
    // deleteCookie("user_id");
    // deleteCookie("email");
    // deleteCookie("nickname");
    deleteCookie("Access");
  }

  return response;
};
