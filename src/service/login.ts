import axios from "axios";

export const login = async (email: string, password: string) => {
  const loginRequest = { id: email, password };
  const { data: response } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/user/login`,
    loginRequest,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
