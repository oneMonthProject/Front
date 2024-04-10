export const CREW_STATUS = {
    PARTICIPATING: '참여중',
    WITHDRAWLING: '탈퇴 진행중'
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

/**
 * paging - 페이지별 row
 */
export const ITEM_COUNT = {
    CARDS_SM: 6,
    CARDS: 8,
    LIST_SM: 5,
} as const;

/**
 * paging - 페이지 range
 */
export const PAGE_RANGE = {
    DEFAULT: 5
} as const;



