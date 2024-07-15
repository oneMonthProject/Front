import {requestWithAuth} from "@/service/project/request";

export const logout = async () => {
  return await requestWithAuth('POST', '/api/user/logout');
};
