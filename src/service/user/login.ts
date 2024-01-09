const publicURL = process.env.NEXT_PUBLIC_URL;

export const login = async (email: string, password: string) => {
  const loginRequest = { email, password };

  const response = await fetch(`${publicURL}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(loginRequest),
  });

  return response.json();
};
