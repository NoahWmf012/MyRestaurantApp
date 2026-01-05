import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { UserPrismaInterface } from '../../../interfaces/schemaPrismaInterface'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQueryAuth('user'),
    endpoints: (builder) => ({
        getProfile: builder.query<UserPrismaInterface, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
        }),
    }),
})

export const { useLazyGetProfileQuery, useGetProfileQuery } = userAPI