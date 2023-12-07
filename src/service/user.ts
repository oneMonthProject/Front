import authAxios from "@/utils/authAxios";
import axios from "axios";

export interface updateUserInfo {
  id: bigint;
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

export const checkEmail = async (email: string) => {
  const { data: response } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/user/check-email/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const checkNickname = async (nickname: string) => {
  const { data: response } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/user/check-nickname/${nickname}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateUser = async (data: updateUserInfo) => {
  const { data: response } = await authAxios.put("/api/user", data);

  return response.data;
};

// export const getUser = async (userId: bigint) => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND}/api/user/${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.json();
// };

export const getUser = async (userId: bigint) => {
  const { data: response } = await authAxios.get(`/api/user/${userId}`);

  return response.data;
};

export const updateUserProfileImg = async (image: File) => {
  const { data: response } = await authAxios.post(
    "/api/user/me/profile-img",
    image,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "",
      },
    }
  );

  return response.data;
};
