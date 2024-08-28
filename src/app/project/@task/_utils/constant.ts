

export const TASK_STATUS = {
    DEFAULT: {
        name: '진행상태',
        value: null
    },
    PS001: {
        name: '시작전',
        value: 'PS001'
    },
    PS002: {
        name: '진행중',
        value: 'PS002'
    },
    PS003: {
        name: '완료',
        value: 'PS003'
    }
} as const;

export const MAX_TASK_CONTENT_DETAIL = 5;