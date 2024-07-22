import {ResponseBody} from "@/utils/type";
import {COOKIE, deleteCookieValue, getCookieValue} from "@/app/api/_interceptor/utils/cookieUtils";
import {deleteUserRefToken} from "@/app/api/_interceptor/authApi/refreshToken";
import {
    ErrorHandle,
    errorHandleMethod,
    ErrorHandlePage,
    errorResponseMessage,
    extractErrorCode,
    getStatusByErrorCode,
    isGatewayErrorCode
} from "@/app/api/_interceptor/error/utils";
import {CustomInterceptorErrorCode} from "@/app/api/_interceptor/error/constants";


export type CustomResponseHeaderInit = HeadersInit & {
    'X-Error-Handle'?: ErrorHandle,
    'X-Error-Handle-Page'?: ErrorHandlePage
};
export type CustomResponseInit = ResponseInit & {
    headers: CustomResponseHeaderInit;
}

export class CustomResponse extends Response {
    constructor(body?: (BodyInit | null | undefined), init?: (CustomResponseInit | undefined)) {
        super(body, init);
    }
}

/**
 * 커스텀 에러 Response 생성
 * @param errorCode
 */
const errorResponse = (errorCode: CustomInterceptorErrorCode) => {
    const status = getStatusByErrorCode(errorCode);
    const message = errorResponseMessage(errorCode);
    const errorHandle = errorHandleMethod(errorCode);

    const responseBody: ResponseBody<null> = {
        result: 'fail',
        message,
        data: null,
        errorHandle
    };

    const headers: CustomResponseHeaderInit = {'X-Error-Handle': errorHandle};
    if (errorHandle === 'errorPage') {
        headers["X-Error-Handle-Page"] = `/error/${status}?error=${errorCode}`;
    }

    return new CustomResponse(JSON.stringify(responseBody), {status, headers});
}


/**
 * 프로세스 수행 에러 or Response ok 아닐 때 커스텀 에러 Response 생성
 * @param error
 */
export const createErrorResponse = async (error: Error) => {
    let errorCode:CustomInterceptorErrorCode = "EDEFAULT"

    try{
        errorCode = extractErrorCode(error);
    }catch(e){
        console.error((e as Error).cause);
    }

    if(isGatewayErrorCode(errorCode)) console.error(error);

    if (
        isGatewayErrorCode(errorCode) ||
        errorCode === 'EXPIRED_TOKEN' ||
        errorCode === 'REFRESH_TOKEN_NOT_FOUND'
    ) {
        deleteCookieValue(COOKIE.ACS_TOKEN);
        deleteCookieValue(COOKIE.REF_TOKEN);
        deleteCookieValue(COOKIE.USER_ID);
        deleteUserRefToken(getCookieValue(COOKIE.USER_ID));
    }

    return errorResponse(errorCode);
}

