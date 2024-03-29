export enum CREW_STATUS {
    PARTICIPATING = '참여중',
    WITHDRAWLING = '탈퇴 진행중'
}

export const NOTICE_TYPE = {
    RECRUIT: '모집',
    WORK: '업무',
    ADD: '크루',
    WITHDRAWL: '크루',
    FORCEWITHDRAWL: '크루',
    CREW: '크루'
} as const;

export enum POINT_TYPE {
    plus = 1,
    minus = 2
}

export enum TRUST_GRADE {
    '1등급' = 1,
    '2등급' = 2,
    '3등급' = 3,
    '4등급' = 4
}
