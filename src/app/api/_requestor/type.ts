import {HttpStatus} from "@/app/api/_requestor/httpStatus";
import {ErrorMessageType} from "@/app/api/_requestor/responseUtils";


export type ErrorHandle = 'retry' | 'snackbar' | 'errorPage';
export type ErrorHandlePage = `/error/${typeof HttpStatus[keyof typeof HttpStatus]}?error=${ErrorMessageType}`;

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