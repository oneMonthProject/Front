import {request} from "@/service/project/request";


export async function getUserProjectNotice(pageIndex:number, itemCount:number){
    return await request('GET', `/api/user/userNotice?pageIndex=${pageIndex}&itemCount=${itemCount}`);
}