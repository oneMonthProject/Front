import { setCookie } from "cookies-next";

export const login = async (email: string, password: string) => {
  const loginRequest = { email, password };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/user/login/public`,
    {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { headers } = response;
  console.log("Access", headers.get("Authorization"));
  
  setCookie("Access", headers.get("Authorization"));

  return response.json();
};
