import authApi from "@/utils/authApi";
import { deleteCookie } from "cookies-next";

export const logout = async () => {
  const response = await authApi("/api/user/logout");

  if (response.ok) {
    deleteCookie("user_id");
    deleteCookie("Access");
    deleteCookie("Refresh");
  }

  return response.json();
};
