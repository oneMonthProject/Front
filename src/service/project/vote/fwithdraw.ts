import {VoteFWReqData} from "@/service/project/vote/type";
import {requestWithAuth} from "@/service/project/request";

/**
 * 프로젝트 "강제탈퇴" 투표
 * @param reqData
 */
export const voteForProjectFWithdraw = async (reqData: VoteFWReqData) => {
    return await requestWithAuth("POST", '/api/project/vote/fwithdraw', reqData);
}