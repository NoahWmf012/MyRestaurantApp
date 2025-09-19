import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse, UserProfileResponse } from '../../../interfaces/queryInterface/userAPIInterface'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQueryAuth(import.meta.env.VITE_SERVER_URL),
    endpoints: (builder) => ({
        signIn: builder.query<SignInResponse, SignInRequest>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.query<SignUpResponse, SignUpRequest>({
            query: (newUser) => ({
                url: '/auth/signup',
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

export const { useSignInQuery, useSignUpQuery, useGetUserProfileQuery } = userAPI