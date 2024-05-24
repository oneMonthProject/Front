

export const TASK_STATUS = {
    DEFAULT: {
        name: '진행상태',
        value: null
    },
    NOT_START: {
        name: '시작전',
        value: 'PS001'
    },
    ON_PROCESS: {
        name: '진행중',
        value: 'PS002'
    },
    FINISH: {
        name: '완료',
        value: 'PS003'
    },
    EXPIRED: {
        name: '만료',
        value: 'PS004'
    }
} as const;

export const MAX_TASK_CONTENT_DETAIL = 5;