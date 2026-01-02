import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryNoAuth } from '../keycloak'
import type { ForgetPasswordRequest, ForgetPasswordResponse, GuestLoginRequest, GuestLoginResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, SignUpRequest, SignUpResponse } from '../../../interfaces/queryInterface/authAPIInterface'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQueryNoAuth(import.meta.env.VITE_SERVER_URL),
    endpoints: (builder) => ({
        login: builder.query<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
        signUp: builder.query<SignUpResponse, SignUpRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),
        forgetPassword: builder.query<ForgetPasswordResponse, ForgetPasswordRequest>({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),
        freshToken: builder.query<RefreshTokenResponse, RefreshTokenRequest>({
            query: (body) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                body,
            }),
        }),
        guestLogin: builder.query<GuestLoginResponse, GuestLoginRequest>({
            query: (body) => ({
                url: '/auth/guest-login',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        getProfile: builder.query<void, void>({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
        }),
    }),
})

export const { useLazyLoginQuery, useLazySignUpQuery, useLazyForgetPasswordQuery, useLazyFreshTokenQuery, useLazyGuestLoginQuery, useLogoutMutation } = authAPI