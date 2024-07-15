import {HttpStatus} from "@/app/api/_requestor/httpStatus";
import {CustomResponse, CustomResponseHeaderInit, ErrorHandle} from "@/app/api/_requestor/type";
import {ResponseBody} from "@/utils/type";

/**
 * 백엔드 서버에서 Response body의 message에 담아 전송하는 에러 메세지
 */
export const ErrorResponseMessage = {
    // UNAUTHORIZED
    EXPIRED_TOKEN: '서비스 이용을 위해 로그인해주세요.',
    REFRESH_TOKEN_NOT_FOUND: '서비스 이용을 위해 로그인해주세요.',
    AUTHENTICATION_FAIL: '사용자 인증에 실패하였습니다. 이메일 혹은 비밀번호를 확인해주세요.',
    NO_REFRESH_TOKEN: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
    NON_ACCESS_TOKEN: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
    WRONG_TYPE_SIGNATURE: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
    WRONG_TYPE_TOKEN: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
    INSUFFICIENT_USER_IDENTIFICATION_FOR_TOKEN_REISSUE: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
    INVALID_REFRESH_TOKEN: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',
    MALFORMED_TOKEN: '유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다.',

    // FORBIDDEN
    ACCESS_DENIED: '요청한 정보에 대한 접근 권한이 없습니다.',
    NO_PERMISSION_TO_EDIT_OR_DELETE: '요청한 정보를 수정/삭제할 권한이 없습니다.',

    // NOT_FOUND
    NOT_FOUND_USER: '존재하지 않는 사용자 입니다.',
    NO_PROFILE_IMG: '프로필 이미지가 존재하지 않습니다.',
    NOT_FOUND_BOARD: '존재하지 않는 게시물 입니다.',

    // CONFLICT
    IN_USE_EMAIL: '이미 존재하는 이메일주소 입니다.',
    IN_USE_NICKNAME: '이미 존재하는 닉네임 입니다.',
    IN_USE_OAUTH_USER: '이미 존재하는 사용자 입니다.',

    // INTERNAL_SERVER_ERROR
    INTERNAL_SERVER_ERROR: '프로세스 수행 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
} as const;
export type ErrorMessageType = keyof typeof ErrorResponseMessage;

export const isErrorMessageType = (arg: string): arg is ErrorMessageType => {
    return Object.keys(ErrorResponseMessage).find(v => v === arg) !== undefined;
}

/**
 * 커스텀 에러 Response헤더의 에러핸들 메서드 결정
 * @param errorMessage
 */
const errorHandleMethod = (errorMessage: ErrorMessageType): ErrorHandle => {
    switch (errorMessage) {
        case 'AUTHENTICATION_FAIL':
        case 'NO_PROFILE_IMG':
        case 'IN_USE_EMAIL' :
        case 'IN_USE_NICKNAME' :
        case 'IN_USE_OAUTH_USER' :
            return 'snackbar';

        case 'MALFORMED_TOKEN':
        case 'WRONG_TYPE_SIGNATURE':
        case 'WRONG_TYPE_TOKEN':
        case 'NON_ACCESS_TOKEN':
        case 'NO_REFRESH_TOKEN':
        case 'INSUFFICIENT_USER_IDENTIFICATION_FOR_TOKEN_REISSUE':
        case 'INVALID_REFRESH_TOKEN':
        case 'EXPIRED_TOKEN':
        case 'REFRESH_TOKEN_NOT_FOUND':
        case 'ACCESS_DENIED':
        case 'NO_PERMISSION_TO_EDIT_OR_DELETE':
        case 'NOT_FOUND_USER':
        case 'NOT_FOUND_BOARD':
        case 'INTERNAL_SERVER_ERROR':
            return 'errorPage';

        default:
            return 'errorPage';
    }
}


/**
 * 에러메세지 - status 매핑
 * @param message
 */
export const getStatusByErrorMessage = (message: string) => {
    switch (message) {
        case 'MALFORMED_TOKEN':
        case 'WRONG_TYPE_SIGNATURE':
        case 'WRONG_TYPE_TOKEN':
        case 'NON_ACCESS_TOKEN':
        case 'NO_REFRESH_TOKEN':
        case 'INSUFFICIENT_USER_IDENTIFICATION_FOR_TOKEN_REISSUE':
        case 'INVALID_REFRESH_TOKEN':
            return HttpStatus.BAD_REQUEST;

        case 'AUTHENTICATION_FAIL':
        case 'EXPIRED_TOKEN':
        case 'REFRESH_TOKEN_NOT_FOUND':
            return HttpStatus.UNAUTHORIZED;

        case 'ACCESS_DENIED':
        case 'NO_PERMISSION_TO_EDIT_OR_DELETE':
            return HttpStatus.FORBIDDEN;

        case 'NOT_FOUND_USER':
        case 'NO_PROFILE_IMG':
        case 'NOT_FOUND_BOARD':
            return HttpStatus.NOT_FOUND;

        case 'IN_USE_EMAIL' :
        case 'IN_USE_NICKNAME' :
        case 'IN_USE_OAUTH_USER' :
            return HttpStatus.CONFLICT;

        case 'INTERNAL_SERVER_ERROR':
            return HttpStatus.INTERNAL_SERVER_ERROR;

        default:
            return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}


/**
 * 커스텀 에러 Response 생성
 * @param errorMessage
 */
const errorResponse = (errorMessage: ErrorMessageType) => {

    const responseBody:ResponseBody<null> = {
        result: 'fail',
        message: ErrorResponseMessage[errorMessage],
        data: null,
        errorHandle: errorHandleMethod(errorMessage)
    };

    const errorHandle = responseBody.errorHandle!;
    const status = getStatusByErrorMessage(errorMessage);

    const headers: CustomResponseHeaderInit = {'X-Error-Handle': errorHandle};
    if (errorHandle === 'errorPage') headers["X-Error-Handle-Page"] = `/error/${status}?error=${errorMessage}`;

    return new CustomResponse(JSON.stringify(responseBody), {status, headers});
}

export const getResErrorMessage = async (response: Response): Promise<ErrorMessageType> => {
    const copied = response.clone();
    const resBody = await copied.json();
    return resBody.message;
}

/**
 * 프로세스 수행 에러 or Response ok 아닐 때 커스텀 에러 Response 생성
 * @param arg
 */
export const createErrorResponse = async (arg: Response | Error) => {
    let response: CustomResponse;

    if (arg instanceof Error) {
        if (isErrorMessageType(arg.message)) {
            response = errorResponse(arg.message);
        } else {
            response = errorResponse('INTERNAL_SERVER_ERROR');
        }
    } else {
        const resMessage = await getResErrorMessage(arg);
        response = errorResponse(resMessage);
    }

    return response;
}

