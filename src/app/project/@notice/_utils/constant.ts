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

export type RecruitOptionKeyType = keyof typeof RecruitOption;
export type RecruitOptionNameType = (typeof RecruitOption)[RecruitOptionKeyType]["name"];
export type RecruitOptionValueType = (typeof RecruitOption)[RecruitOptionKeyType]["value"];


/**
 * 프로젝트 상세 > 알림 > 강제탈퇴알림용 select 옵션
 */
export const ForceWDLOption = {
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

export type ForceWDLOptionKeyType = keyof typeof ForceWDLOption;
export type ForceWDLOptionNameType = (typeof ForceWDLOption)[ForceWDLOptionKeyType]["name"];
export type ForceWDLOptionValueType = (typeof ForceWDLOption)[ForceWDLOptionKeyType]["value"];

/**
 * 프로젝트 상세 > 알림탭 서브메뉴
 */
export const PROJECT_NOTICE_MENU = {
    ALL: {name: '전체', value: 'ALL', path: '/all'},
    RECRUIT: {name: '모집', value: 'RECRUIT', path: '/recruits'},
    WORK: {name: '업무', value: 'WORK', path: '/works'},
    CREW: {name: '크루', value: 'CREW', path: '/crews'}
} as const;


/**
 * 프로젝트 상세 > 알림 > 알림타입 & 알림타입별 색상
 */
export const PROJECT_NOTICE_COLOR = {
    RECRUIT: 'yellow',
    WORK: 'green',
    CREW: 'blue'
}

export const PROJECT_NOTICE_TYPE = {
    RECRUIT: {
        name: '모집',
        value: 'RECRUIT',
        menu: PROJECT_NOTICE_MENU.RECRUIT.value,
        color: PROJECT_NOTICE_COLOR.RECRUIT
    },
    WORK: {
        name: '업무',
        value: 'WORK',
        menu: PROJECT_NOTICE_MENU.WORK.value,
        color: PROJECT_NOTICE_COLOR.WORK
    },
    ADD: {
        name: '크루 추가',
        value: 'ADD',
        menu: PROJECT_NOTICE_MENU.CREW.value,
        color: PROJECT_NOTICE_COLOR.CREW
    },
    WITHDRAWL: {
        name: '크루 탈퇴',
        value: 'WITHDRAWL',
        menu: PROJECT_NOTICE_MENU.CREW.value,
        color: PROJECT_NOTICE_COLOR.CREW
    },
    FORCEWITHDRAWL: {
        name: '크루 강제탈퇴',
        value: 'FORCEWITHDRAWL',
        menu: PROJECT_NOTICE_MENU.CREW.value,
        color: PROJECT_NOTICE_COLOR.CREW
    },
    CREW_CONFIRM: {
        name: '크루 알림 확인',
        value: 'CREW_CONFIRM',
        menu: PROJECT_NOTICE_MENU.CREW.value,
        color: PROJECT_NOTICE_COLOR.CREW
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
}
