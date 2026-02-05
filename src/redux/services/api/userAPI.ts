import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { BookmarkPrismaInterface, UserPrismaInterface } from '../../../interfaces/schemaPrismaInterface'
import type { BookmarkRequest } from '../../../interfaces/queryInterface/userInterface';

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
        //@Get('bookmarks')
        getBookmarks: builder.query<BookmarkPrismaInterface[], void>({
            query: () => ({
                url: '/bookmarks',
                method: 'GET',
            }),
        }),
        //@Post('bookmarks/add')
        addBookmark: builder.mutation<void, BookmarkRequest>({
            query: (body) => ({
                url: `/bookmarks/add`,
                method: 'POST',
                body,
            }),
        }),
        //@Put('bookmarks/update')
        updateBookmark: builder.mutation<void, BookmarkRequest>({
            query: (body) => ({
                url: `/bookmarks/update`,
                method: 'PUT',
                body,
            }),
        }),
        //@Delete('bookmarks/delete/:restaurantId')
        deleteBookmark: builder.mutation<void, { restaurantId: number }>({
            query: ({ restaurantId }) => ({
                url: `/bookmarks/delete/${restaurantId}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useGetProfileQuery, useLazyGetBookmarksQuery, useAddBookmarkMutation, useUpdateBookmarkMutation, useDeleteBookmarkMutation } = userAPI