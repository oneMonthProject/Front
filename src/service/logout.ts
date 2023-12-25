import authApi from "@/utils/authApi";
import { deleteCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;
const isTest = process.env.NEXT_PUBLIC_API_MOCKING === "true";

const request = async (url: string, props: RequestInit) => {
  if (isTest) {
    return await fetch(`${baseURL}${url}`, props);
  } else {
    return await authApi(url, props);
  }
};

export const logout = async () => {
  const response = await request("/api/user/logout", { method: "POST" });

  if (response.ok) {
    deleteCookie("user_id");
    deleteCookie("Access");
    deleteCookie("Refresh");
  }

  return response.json();
};
