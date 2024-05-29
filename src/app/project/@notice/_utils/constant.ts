/**
 * 프로젝트 상세 > 알림 > 모집알림용 select 옵션
 */
export const RecruitOption = {
    DEFAULT: {
        name: '합류 여부 선택',
        value: null
    },
    PERMIT: {
        name: '수락',
        value: true
    },
    REJECT: {
        name: '거절',
        value: false
    }
} as const;


export type CrewWithdrawConfirm = {
    withdrawConfirm: CrewWithdrawOptionValueType
};

/**
 * 프로젝트 상세 > 알림 > 강제탈퇴알림용 select 옵션
 */
export const CrewWithdrawOption = {
    DEFAULT: {
        name: '탈퇴 여부 선택',
        value: null
    },
    PERMIT: {
        name: '탈퇴',
        value: true
    },
    REJECT: {
        name: '보류',
        value: false
    }
} as const;

export type CrewWithdrawOptionKeyType = keyof typeof CrewWithdrawOption;
export type CrewWithdrawOptionNameType = (typeof CrewWithdrawOption)[CrewWithdrawOptionKeyType]["name"];
export type CrewWithdrawOptionValueType = (typeof CrewWithdrawOption)[CrewWithdrawOptionKeyType]["value"];


/**
 * 프로젝트 상세 > 알림탭 서브메뉴
 */
export const PROJECT_NOTICE = {
    ALL: {
        desc: '전체',
        path: '/all',
    },
    RECRUIT: {
        desc: '모집',
        path: '/recruits',
        color: 'yellow'
    },
    WORK: {
        desc: '업무',
        path: '/works',
        color: 'green'
    },
    CREW: {
        desc: '크루',
        path: '/crews',
        color: 'blue'
    },
} as const;


/**
 * 프로젝트 상세 > 알림 타입
 */
export const PROJECT_NOTICE_TYPES = {
    RECRUIT: {
        name: '모집',
        group:'RECRUIT'
    },
    WORK: {
        name: '업무',
        group:'WORK'
    },
    ADD: {
        name: '크루 추가',
        group: 'CREW'
    },
    WITHDRAWAL: {
        name: '크루 탈퇴',
        group: 'CREW'
    },
    FORCED_WITHDRAWAL: {
        name: '크루 강제탈퇴',
        group: 'CREW'
    },
    CREW_UPDATE: {
        name: '크루 알림 확인',
        group: 'CREW'
    }
} as const;

export const TaskPointOptions = {
    default: {
        name: '점수 타입 선택',
        value: null,
    },
    plus: {
        name: '+ 신뢰점수',
        value: 1
    },
    minus: {
        name: '- 신뢰점수',
        value: 2
    }
} as const;
