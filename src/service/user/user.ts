import {request} from "@/service/project/request";

const publicURL = process.env.NEXT_PUBLIC_URL;

export interface updateUserInfo {
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

export const checkNickname = async (nickname: string) => {
  const response = await fetch(
    `${publicURL}/api/user/nickname?nickname=${nickname}`
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

export const updateUser = async (
  updateData: updateUserInfo,
  file: File | null
) => {
  const formData = new FormData();
  formData.append(
    "updateRequest",
    new Blob([JSON.stringify(updateData)], {
      type: "application/json",
    })
  );

  if (file) {
    formData.append("file", file);
  }

  const response = await fetch(`${publicURL}/api/user`, {
    method: "PUT",
    body: formData,
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

export const deleteProfileImage = async () => {
  const response = await fetch(`${publicURL}/api/user/profile-img`, { method: "DELETE" });
  return response.json();
};

/**
 * 일반 사용자 정보 조회
 * @param userId
 */
export const getUserInfoByUserId = async (userId: string | bigint) => {
  return request('GET',`/api/user/general?userId=${userId}`);
}