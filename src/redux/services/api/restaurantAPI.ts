import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { RestaurantResponse } from '../../../interfaces/queryInterface/restaurantInterface'

export const restaurantAPI = createApi({
    reducerPath: 'restaurantAPI',
    baseQuery: fetchBaseQueryAuth('restaurants'),
    endpoints: (builder) => ({
        getRestaurants: builder.query<RestaurantResponse, void>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetRestaurantsQuery } = restaurantAPI