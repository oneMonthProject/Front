import {authRequest, request} from "@/service/project/request";

export const login = async (email: string, password: string) => {
  const loginRequest = { email, password };
  return await request("POST", '/api/user/login', loginRequest);
};
