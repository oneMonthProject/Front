
const baseurl = 'https://jsonplaceholder.typicode.com';
export async function getPositionList() {
    const data = await fetch(`${baseurl}/todos`);
    return data.json();
}

export async function getTechList(){
    const data = await fetch(`${baseurl}/posts`);
    return data.json();
}