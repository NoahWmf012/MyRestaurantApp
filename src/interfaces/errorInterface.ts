export interface ErrorInterface {
    status: number
    data?: {
        errCode?: string
        errMsg?: string
        traceId?: string
    }
}