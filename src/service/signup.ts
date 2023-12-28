import axios from "axios";

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

export const signUp = async (signUpRequest: SignUpRequest) => {
  const { data: response } = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/user/public`,
    signUpRequest,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
