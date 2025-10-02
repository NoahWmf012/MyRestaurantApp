import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import type { AuthInterface } from "../reducers/authSlice";

// get JWT from localStorage
export const getAccessToken = (): string => {
    const stored = localStorage.getItem('authInfo')
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as AuthInterface
            return parsed.accessToken || ''
        } catch (error) {
            console.error('Error parsing authInfo from localStorage:', error)
            localStorage.removeItem('authInfo') // Clear corrupted data
        }
    }
    return ''
}

export const fetchBaseQueryAuth = (baseUrl: string) => {
    return async (args: string | FetchArgs, api: BaseQueryApi) => {
        const localToken = getAccessToken()

        const baseQuery = fetchBaseQuery({
            baseUrl,
            async prepareHeaders(headers) {
                headers.set('Authorization', `Bearer ${localToken}`)
                return headers
            }
        })

        const result = await baseQuery(args, api, { token: localToken })
        return result
    };
};
