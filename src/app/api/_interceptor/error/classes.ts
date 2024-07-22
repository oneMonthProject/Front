import {CustomInterceptorErrorCode, GatewayErrorCode, ResponseNotOKCode} from "@/app/api/_interceptor/error/constants";

export class CustomInterceptorError extends Error {
    code: CustomInterceptorErrorCode;

    constructor(code: CustomInterceptorErrorCode, message: string) {
        super(message);
        this.code = code;
    }
}

export class GatewayError extends CustomInterceptorError {
    constructor(code: GatewayErrorCode, message: string) {
        super(code, message);
    }
}

export class ResponseError extends CustomInterceptorError {
    constructor(code: ResponseNotOKCode) {
        super(code, "Response not ok");
    }
}