import {requestWithAuth} from "@/service/project/request";

const publicURL = process.env.NEXT_PUBLIC_URL;

export interface updateUserInfo {
    nickname: string;
    positionId: bigint;
    techStackIds: bigint[];
    intro: string;
}

export const checkNickname = async (nickname: string) => {
    const response = await fetch(
        `${publicURL}/api/user/nickname?nickname=${nickname}`
    );
    return response.json();
};

export const getSimpleUser = async () => {
    return await requestWithAuth('GET', '/api/user/simple');
};

export const getUserIfo = async () => {
    return await requestWithAuth('GET', `/api/user`);
};

export const updateUser = async (
    updateData: updateUserInfo,
    file: File | null
) => {
    const formData = new FormData();
    formData.append(
        "updateRequest",
        new Blob([JSON.stringify(updateData)], {
            type: "application/json",
        })
    );

    if (file) {
        formData.append("file", file);
    }

    return await requestWithAuth('PUT', '/api/user', {
        method: "PUT",
        body: formData,
    });
};

export const getUserProjectHistory = async (pageNumber: number) => {
    return await requestWithAuth('GET', `/api/user/history?pageNumber=${pageNumber}`)
};

export const getTrustGradeListByUser = async () => {
    return await requestWithAuth('GET', '/api/user/trust-grade');
};

export const deleteProfileImage = async () => {
    return await requestWithAuth('DELETE', '/api/user/profile-img');
};

/**
 * 일반 사용자 정보 조회
 * @param userId
 */
export const getUserInfoByUserId = async (userId: string | bigint) => {
    return await requestWithAuth('GET', `/api/user/general?userId=${userId}`);
}