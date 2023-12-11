export const login = async (email: string, password: string) => {
  const loginRequest = { id: email, password };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/user/login`,
    {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};
