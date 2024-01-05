import authApi from "@/utils/authApi";

export interface updateUserInfo {
  id: bigint;
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

const publicURL = process.env.NEXT_PUBLIC_URL;
const baseURL = process.env.NEXT_PUBLIC_BACKEND;
const isTest = process.env.NEXT_PUBLIC_API_MOCKING === "true";

const request = async (url: string, props: RequestInit) => {
  if (isTest) {
    return await fetch(`${baseURL}${url}`, props);
  } else {
    return await authApi(url, props);
  }
};

export const checkNickname = async (nickname: string) => {
  const response = await fetch(
    `${baseURL}/api/user/check-nickname/${nickname}/public`
  );
  return response.json();
};

export const getSimpleUser = async () => {
  const response = await fetch(`${publicURL}/api/user/simple`);
  return response.json();
};

export const getUserIfo = async () => {
  const response = await fetch(`${publicURL}/api/user`);
  return response.json();
};

export const updateUser = async (updateData: updateUserInfo) => {
  const response = await fetch(`${publicURL}/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  return response.json();
};

export const updateUserProfileImg = async (image: File) => {
  const response = await request("/api/user/me/profile-img", {
    method: "POST",
    body: image,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.json();
};

export const getUserProjectHistory = async (pageNumber: number) => {
  const response = await fetch(
    `${publicURL}/api/user/history?pageNumber=${pageNumber}`
  );
  return response.json();
};

export const getTrustGradeListByUser = async () => {
  const response = await fetch(`${publicURL}/api/user/trust-grade`);
  return response.json();
};
