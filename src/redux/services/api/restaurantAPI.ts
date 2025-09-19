import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'

export const restaurantAPI = createApi({
    reducerPath: 'restaurantAPI',
    baseQuery: fetchBaseQueryAuth(import.meta.env.VITE_SERVER_URL),
    endpoints: (builder) => ({
        getRestaurants: builder.query({
            query: () => ({
                url: '/restaurants',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetRestaurantsQuery } = restaurantAPI