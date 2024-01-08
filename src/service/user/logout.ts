const publicURL = process.env.NEXT_PUBLIC_URL;

export const logout = async () => {
  const response = await fetch(`${publicURL}/api/user/logout`, {
    method: "POST",
  });

  return response.json();
};
