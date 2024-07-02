export type ErrorHandle = 'retry' | 'snackbar' | 'errorPage';
export type ErrorHandlePage = '/error/unauthorized' | '/error/internalServerError';
export type CustomResponseHeaderType = HeadersInit & {
    'X-Error-Handle'?: ErrorHandle,
    'X-Error-Handle-Page'?: ErrorHandlePage
};
export type CustomResponseInit = ResponseInit & {
    headers: CustomResponseHeaderType;
}

export class CustomResponse extends Response {
    constructor(body?: (BodyInit | null | undefined), init?: (CustomResponseInit | undefined)) {
        super(body, init);
    }
}