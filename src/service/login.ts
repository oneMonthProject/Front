import { setCookie } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export const login = async (email: string, password: string) => {
  const loginRequest = { email, password };

  const response = await fetch(
    `${baseURL}/api/user/login/public`,
    {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (response.ok) {
    const { headers } = response;
    console.log("Access", headers.get("Authorization"));
    setCookie("Access", headers.get("Authorization"));
  }

  return response.json();
};
