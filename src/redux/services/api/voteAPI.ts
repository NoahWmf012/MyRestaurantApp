import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { CreatePollRequest, PollResponse, VoteRequest } from '../../../interfaces/queryInterface/pollAPIInterface'

export const voteAPI = createApi({
    reducerPath: 'voteAPI',
    baseQuery: fetchBaseQueryAuth('polls'),
    endpoints: (builder) => ({
        getPolls: builder.query<PollResponse[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
        createPoll: builder.mutation<void, CreatePollRequest>({
            query: (newPoll) => ({
                url: '/create-poll',
                method: 'POST',
                body: newPoll,
            }),
        }),
        updateVote: builder.mutation<void, VoteRequest>({
            query: (body) => ({
                url: `/vote-poll`,
                method: 'PUT',
                body,
            }),
        }),

        //@Get('share/:shareToken')
        getPollByShareToken: builder.query<PollResponse, string>({
            query: (shareToken: string) => ({
                url: `/share/${shareToken}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useCreatePollMutation, useGetPollsQuery, useLazyGetPollsQuery, useUpdateVoteMutation, useGetPollByShareTokenQuery } = voteAPI