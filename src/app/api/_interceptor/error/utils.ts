import {HttpStatus} from "@/app/api/_interceptor/utils/httpStatus";
import {
    CustomInterceptorErrorCode,
    GatewayErrorCode,
    GatewayErrorMessage,
    ResponseNotOKCode,
    ResponseNotOKMessage
} from "@/app/api/_interceptor/error/constants";
import {CustomInterceptorError, GatewayError} from "@/app/api/_interceptor/error/classes";

export type ErrorHandle = 'retry' | 'snackbar' | 'errorPage';
export type ErrorHandlePage = `/error/${typeof HttpStatus[keyof typeof HttpStatus]}?error=${CustomInterceptorErrorCode}`;

export const isResponseNotOKCode = (arg: string): arg is ResponseNotOKCode => {
    return ResponseNotOKMessage[arg as ResponseNotOKCode] !== undefined;
}
export const isGatewayErrorCode = (arg: string): arg is GatewayErrorCode => {
    return GatewayErrorMessage[arg as GatewayErrorCode] !== undefined;
}
export const isCustomInterceptorErrorCode = (arg: string): arg is CustomInterceptorErrorCode => {
    return isResponseNotOKCode(arg) || isGatewayErrorCode(arg);
}
export const isCustomInterceptorError = (arg: Error): arg is CustomInterceptorError => {
    const code = (arg as CustomInterceptorError).code;
    return code && isCustomInterceptorErrorCode(code);
}

/**
 * 커스텀 에러 Response 헤더의 errorHandle
 * @param errorCode
 */
export const errorHandleMethod = (errorCode: string): ErrorHandle => {
    if (isCustomInterceptorErrorCode(errorCode)) {
        if (errorCode === 'AUTHENTICATION_FAIL' ||
            errorCode === 'IN_USE_NICKNAME' ||
            errorCode === 'IN_USE_EMAIL' ||
            errorCode === 'IN_USE_OAUTH_USER'||
            errorCode === 'PARTICIPATE_DUPLICATE' ||
            errorCode === 'PARTICIPATE_NOT_ALLOWED' ||
            errorCode === "PARTICIPATE_EXIST" ||
            errorCode === "VOTE_EXIST_FW" ||
            errorCode === "VOTE_INSUFF_VOTERS" ||
            errorCode === "VOTE_DUPLICATE" ||
            errorCode === "VOTE_NOT_ALLOWED" ||
            errorCode === "VOTE_TARGET_NOT_ALLOWED" ||
            errorCode === "VOTE_NOT_ALLOWED_YET"

        ) {
            return 'snackbar';
        }
    }

    return 'errorPage';
}
/**
 * 커스텀 에러 Response body의 message
 * @param errorCode
 */
export const errorResponseMessage = (errorCode: string) => {
    if (isResponseNotOKCode(errorCode)) {
        return ResponseNotOKMessage[errorCode].text;
    } else if (isGatewayErrorCode(errorCode)) {
        return GatewayErrorMessage[errorCode].text;
    } else {
        return GatewayErrorMessage['EDEFAULT'].text;
    }
}
/**
 * 커스텀 에러 Response header의 status
 * @param errorCode
 */
export const getStatusByErrorCode = (errorCode: string) => {
    if (isResponseNotOKCode(errorCode)) return ResponseNotOKMessage[errorCode].status;
    else if (isGatewayErrorCode(errorCode)) return GatewayErrorMessage[errorCode].status;
    else return HttpStatus.INTERNAL_SERVER_ERROR;
}

export const getErrorCodeFromResponse = async (response: Response): Promise<ResponseNotOKCode> => {
    try {
        const copied = response.clone();
        const resBody = await copied.json();
        return resBody.message;
    } catch (error: unknown) {
        throw new GatewayError('EPARSERES', (error as Error).message);
    }
}

export type ErrorWithCauseCode = Error & {
    cause: {
        code: CustomInterceptorErrorCode;
        stack?: string;
        errors?: Error[];
    }
}

export const isErrorWithCauseCode = (arg: Error): arg is ErrorWithCauseCode => {
    const error = arg as ErrorWithCauseCode;
    return error.cause &&
        error.cause.code !== undefined &&
        isGatewayErrorCode(error.cause.code);
}

export const extractErrorCode = (error: Error): CustomInterceptorErrorCode => {
    console.error(error.cause);
    if (isCustomInterceptorError(error)) {
        return error.code;
    } else if (isErrorWithCauseCode(error)) {
        return error.cause.code;
    } else {
        throw new Error("Failed to extract error code", {cause: error});
    }
}

