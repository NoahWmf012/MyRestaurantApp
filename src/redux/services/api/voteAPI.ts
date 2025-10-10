import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { CreatePollRequest, PollResponse, VoteRequest } from '../../../interfaces/queryInterface/pollAPIInterface'

export const voteAPI = createApi({
    reducerPath: 'voteAPI',
    baseQuery: fetchBaseQueryAuth(import.meta.env.VITE_SERVER_URL),
    endpoints: (builder) => ({
        getPolls: builder.query<PollResponse[], void>({
            query: () => ({
                url: '/polls',
                method: 'GET',
            }),
        }),
        createPoll: builder.mutation<void, CreatePollRequest>({
            query: (newPoll) => ({
                url: 'polls/create-poll',
                method: 'POST',
                body: newPoll,
            }),
        }),
        updateVote: builder.mutation<void, VoteRequest>({
            query: ({ pollId, optionId }) => ({
                url: `/polls/vote-poll`,
                method: 'PUT',
                body: { pollId, optionId },
            }),
        }),
    }),
})

export const { useCreatePollMutation, useGetPollsQuery, useUpdateVoteMutation } = voteAPI