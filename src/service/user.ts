import authApi from "@/utils/authApi";

export interface updateUserInfo {
  id: bigint;
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

export const checkEmail = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/public/user/check-email/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const checkNickname = async (nickname: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/public/user/check-nickname/${nickname}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const getSimpleUser = async () => {
  const response = await authApi("/api/user/simple-me", {
    method: "GET",
  });

  return response.json();
};

export const getUserIfo = async () => {
  const response = await authApi("/api/user/me", {
    method: "GET",
  });

  return response.json();
};

export const updateUser = async (updateData: updateUserInfo) => {
  const response = await authApi("/api/user", {
    method: "PUT",
    body: JSON.stringify(updateData),
  });

  return response.json();
};

export const updateUserProfileImg = async (image: File) => {
  const response = await authApi("/api/user/me/profile-img", {
    method: "POST",
    body: image,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.json();
};

export const getUserProjectHistory = async (pageNumber: number) => {
  const response = await authApi(
    `/api/user/me/project-history?pageNumber=${pageNumber}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
