import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse, UserProfileResponse } from '../../../interfaces/queryInterface/userAPIInterface'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQueryAuth(import.meta.env.VITE_SERVER_URL),
    endpoints: (builder) => ({
        login: builder.query<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.query<SignUpResponse, SignUpRequest>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        getUserProfile: builder.query<UserProfileResponse, void>({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
        }),
    }),
})

export const { useLazyLoginQuery, useLazySignUpQuery, useGetUserProfileQuery } = userAPI