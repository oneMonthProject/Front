const publicURL = process.env.NEXT_PUBLIC_URL;

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  positionId: bigint;
  techStackIds: bigint[];
  intro: string;
}

export const signUp = async (signUpRequest: SignUpRequest) => {
  const response = await fetch(`${publicURL}/api/user/signup`, {
    method: "POST",
    body: JSON.stringify(signUpRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
