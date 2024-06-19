import {requestWithAuth} from "@/service/project/request";


/**
 * 사용자 프로젝트 지원 알림 조회
 * @param pageIndex
 * @param itemCount
 */
export async function getUserProjectNotice(pageIndex:number, itemCount:number){
    return await requestWithAuth('GET', `/api/user/userNotice?pageIndex=${pageIndex}&itemCount=${itemCount}`);
}