import {HttpStatus} from "@/app/api/_interceptor/utils/httpStatus";

export const GatewayErrorMessage = {
    ECONNREFUSED: {text: "현재 서비스를 이용하실 수 없습니다. 빠른 시일 내에 복구하도록 하겠습니다.", status: HttpStatus.SERVICE_UNAVAILABLE},
    ENOTFOUND: {text: "요청하신 주소를 찾을 수 없습니다. URL 확인 후 다시 시도해주세요.", status: HttpStatus.NOT_FOUND},
    ESENDREQ: {text: "요청 전송에 실패했습니다.", status: HttpStatus.INTERNAL_SERVER_ERROR},
    EDEFAULT: {text: "프로세스 수행 중 오류가 발생했습니다.", status: HttpStatus.INTERNAL_SERVER_ERROR},
    EPARSERES: {text: "요청하신 정보에 접근 할 수 없습니다.", status: HttpStatus.BAD_GATEWAY},
} as const;
export type GatewayErrorCode = keyof typeof GatewayErrorMessage;

/**
 * 백엔드 서버에서 Response body의 message에 담아 전송하는 에러 메세지
 */
export const ResponseNotOKMessage = {
    // UNAUTHORIZED
    EXPIRED_TOKEN: {text: '서비스 이용을 위해 로그인해주세요.', status: HttpStatus.UNAUTHORIZED},
    REFRESH_TOKEN_NOT_FOUND: {text: '서비스 이용을 위해 로그인해주세요.', status: HttpStatus.UNAUTHORIZED},
    AUTHENTICATION_FAIL: {text: '사용자 인증에 실패하였습니다. 이메일 혹은 비밀번호를 확인해주세요.', status: HttpStatus.UNAUTHORIZED},
    NO_REFRESH_TOKEN: {text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.', status: HttpStatus.UNAUTHORIZED},
    NON_ACCESS_TOKEN: {text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.', status: HttpStatus.UNAUTHORIZED},
    WRONG_TYPE_SIGNATURE: {text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.', status: HttpStatus.UNAUTHORIZED},
    WRONG_TYPE_TOKEN: {text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.', status: HttpStatus.UNAUTHORIZED},
    INSUFFICIENT_USER_IDENTIFICATION_FOR_TOKEN_REISSUE: {
        text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
        status: HttpStatus.UNAUTHORIZED
    },
    INVALID_REFRESH_TOKEN: {text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.', status: HttpStatus.UNAUTHORIZED},
    MALFORMED_TOKEN: {text: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.', status: HttpStatus.UNAUTHORIZED},

    // FORBIDDEN
    ACCESS_DENIED: {text: '요청한 정보에 대한 접근 권한이 없습니다.', status: HttpStatus.FORBIDDEN},
    NO_PERMISSION_TO_EDIT_OR_DELETE: {text: '요청한 정보를 수정/삭제할 권한이 없습니다.', status: HttpStatus.FORBIDDEN},
    PARTICIPATE_NOT_ALLOWED: {text: '강제 탈퇴 멤버는 프로젝트에 참가할 수 없습니다.', status: HttpStatus.FORBIDDEN},
    VOTE_NOT_ALLOWED: {text: '투표 권한이 없습니다', status: HttpStatus.FORBIDDEN},
    VOTE_NOT_ALLOWED_YET: {text: '프로젝트 참여 3일 후 부터 투표에 참가할 수 있습니다.', status: HttpStatus.FORBIDDEN},
    VOTE_TARGET_NOT_ALLOWED: {text: '투표 대상자는 투표에 참여할 수 없습니다.', status: HttpStatus.FORBIDDEN},
    ACCESS_NOT_ALLOWED: {text: '프로젝트 접근 권한이 없습니다', status: HttpStatus.FORBIDDEN},
    NO_PERMISSION_TO_TASK: {text: '담당 크루만 업무를 완료할 수 있습니다', status: HttpStatus.FORBIDDEN},

    // NOT_FOUND
    NOT_FOUND_USER: {text: '존재하지 않는 사용자 입니다.', status: HttpStatus.NOT_FOUND},
    NO_PROFILE_IMG: {text: '프로필 이미지가 존재하지 않습니다.', status: HttpStatus.NOT_FOUND},
    NOT_FOUND_BOARD: {text: '존재하지 않는 게시물 입니다.', status: HttpStatus.NOT_FOUND},

    // CONFLICT
    IN_USE_EMAIL: {text: '이미 존재하는 이메일주소 입니다.', status: HttpStatus.CONFLICT},
    IN_USE_NICKNAME: {text: '이미 존재하는 닉네임 입니다.', status: HttpStatus.CONFLICT},
    IN_USE_OAUTH_USER: {text: '이미 존재하는 사용자 입니다.', status: HttpStatus.CONFLICT},
    PARTICIPATE_DUPLICATE: {text: '이미 지원중인 프로젝트 입니다.', status: HttpStatus.CONFLICT},
    PARTICIPATE_EXIST: {text: '이미 참여중인 프로젝트 입니다.', status: HttpStatus.CONFLICT},
    VOTE_DUPLICATE: {text: '이미 투표를 완료했습니다.', status: HttpStatus.CONFLICT},

    // INTERNAL_SERVER_ERROR
    INTERNAL_SERVER_ERROR: {text: '프로세스 수행 중 오류가 발생했습니다.', status: HttpStatus.INTERNAL_SERVER_ERROR},
    VOTE_EXIST_FW: {text: '강제탈퇴 투표는 동시에 1개 이상 진행할 수 없습니다.', status: HttpStatus.INTERNAL_SERVER_ERROR},
    VOTE_INSUFF_VOTERS: {text: '강제탈퇴 투표는 탈퇴 대상자를 제외한 최소 2명의 투표자가 필요합니다.', status: HttpStatus.INTERNAL_SERVER_ERROR}
} as const;
export type ResponseNotOKCode = keyof typeof ResponseNotOKMessage;
export type CustomInterceptorErrorCode = GatewayErrorCode | ResponseNotOKCode;