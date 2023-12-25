const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export async function getPositionList() {
    const data = await fetch(`${baseURL}/api/position-list/public`);
    return data.json();
}

export async function getTechList(){
    const data = await fetch(`${baseURL}/api/technology-stack-list/public`);
    return data.json();
}