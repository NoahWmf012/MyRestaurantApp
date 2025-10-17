import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'

export const restaurantAPI = createApi({
    reducerPath: 'restaurantAPI',
    baseQuery: fetchBaseQueryAuth('restaurants'),
    endpoints: (builder) => ({
        getRestaurants: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetRestaurantsQuery } = restaurantAPI