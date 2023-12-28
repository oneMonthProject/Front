import { deleteCookie } from "cookies-next";

const publicURL = process.env.NEXT_PUBLIC_URL;
export const logout = async () => {
  const response = await fetch(`${publicURL}/api/user/logout`, {
    method: "POST",
  });

  if (response.ok) {
    deleteCookie("user_id");
    deleteCookie("Access");
    deleteCookie("Refresh");
  }

  return response.json();
};
