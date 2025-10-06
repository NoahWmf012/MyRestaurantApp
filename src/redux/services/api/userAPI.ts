import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { ForgetPasswordRequest, ForgetPasswordResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, SignUpRequest, SignUpResponse } from '../../../interfaces/queryInterface/userAPIInterface'

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
        forgetPassword: builder.query<ForgetPasswordResponse, ForgetPasswordRequest>({
            query: ({ email }) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),
        freshToken: builder.query<RefreshTokenResponse, RefreshTokenRequest>({
            query: ({ refreshToken }) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                body: { refreshToken },
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useLazyLoginQuery, useLazySignUpQuery, useLazyForgetPasswordQuery, useLazyFreshTokenQuery, useLogoutMutation } = userAPI