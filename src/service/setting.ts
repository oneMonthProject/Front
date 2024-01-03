const publicURL = process.env.NEXT_PUBLIC_URL;
const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export async function getPositionList() {
  const data = await fetch(`${baseURL}/api/position-list/public`);
  return await data.json();
}

export async function getTechStackList() {
  const data = await fetch(`${baseURL}/api/technology-stack-list/public`);
  return await data.json();
}

export const getTrustGradeList = async () => {
  const response = await fetch(`${publicURL}/api/setting/trustGrade`);
  return response.json();
};