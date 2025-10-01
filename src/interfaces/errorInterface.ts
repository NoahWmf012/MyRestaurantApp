export interface ErrorInterface {
    status: number
    data?: {
        errCode?: string
        errMsg?: string
        traceId?: string
    }
}

export interface FormErrorsInterface {
    email?: string;
    password?: string;
    general?: string;
}

export interface ErrMsgInterface {
    path: string;
    message: string;
}

export interface ValidationInterface {
    validated: boolean;
    errMsg?: ErrMsgInterface[];
}