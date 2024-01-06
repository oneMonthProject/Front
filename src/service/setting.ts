const publicURL = process.env.NEXT_PUBLIC_URL;

export async function getPositionList() {
  const response = await fetch(`${publicURL}/api/setting/position`);
  return await response.json();
}

export async function getTechStackList() {
  const response = await fetch(`${publicURL}/api/setting/tech-stack`);
  return await response.json();
}

export async function getTechStackCategoryList() {
  const response = await fetch(`${publicURL}/api/setting/tech-stack-category`);
  return await response.json();
}

export async function getTechStackListWithCategory() {
  const response = await fetch(
    `${publicURL}/api/setting/tech-stack-with-category`
  );
  return await response.json();
}
