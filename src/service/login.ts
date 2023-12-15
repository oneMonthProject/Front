import { setCookie } from "cookies-next";

export const login = async (email: string, password: string) => {
  const loginRequest = { id: email, password };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/public/user/login`,
    {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { headers } = response;
  setCookie("Access", headers.get("Authorization"));

  return response.json();
};
