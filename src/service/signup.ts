const baseURL = process.env.NEXT_PUBLIC_BACKEND;
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

export const signUp = async (signUpRequest: SignUpRequest) => {
  const response = await fetch(`${baseURL}/api/user/public`, {
    method: "POST",
    body: JSON.stringify(signUpRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
