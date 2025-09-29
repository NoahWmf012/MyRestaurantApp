import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { PollResponse } from '../../../interfaces/queryInterface/pollAPIInterface'

export const voteAPI = createApi({
    reducerPath: 'voteAPI',
    baseQuery: fetchBaseQueryAuth(import.meta.env.VITE_SERVER_URL),
    endpoints: (builder) => ({
        createVote: builder.mutation({
            query: (newVote) => ({
                url: '/votes',
                method: 'POST',
                body: newVote,
            }),
        }),
        getPolls: builder.query<PollResponse[], void>({
            query: () => ({
                url: '/polls',
                method: 'GET',
            }),
        }),
        updateVote: builder.query({
            query: ({ voteId, updatedVote }) => ({
                url: `/votes/${voteId}`,
                method: 'PUT',
                body: updatedVote,
            }),
        }),
    }),
})

export const { useCreateVoteMutation, useGetPollsQuery, useLazyGetPollsQuery, useUpdateVoteQuery } = voteAPI