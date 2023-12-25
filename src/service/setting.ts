const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export async function getPositionList() {
    const data = await fetch(`${baseURL}/api/position-list/public`);
    return await data.json();
}

export async function getTechStackList(){
    const data = await fetch(`${baseURL}/api/technology-stack-list/public`);
    return await data.json();
}