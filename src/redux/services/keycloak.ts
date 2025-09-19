import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";

export const fetchBaseQueryAuth = (baseUrl: string) => {
    return async (args: string | FetchArgs, api: BaseQueryApi) => {
        // let localToken: string | undefined = ''
        const localToken = ""

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
