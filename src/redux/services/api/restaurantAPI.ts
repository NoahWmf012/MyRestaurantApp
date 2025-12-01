import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryNoAuth } from '../keycloak'
import type { RestaurantRequest, RestaurantResponse } from '../../../interfaces/queryInterface/restaurantInterface'

export const restaurantAPI = createApi({
    reducerPath: 'restaurantAPI',
    baseQuery: fetchBaseQueryNoAuth('restaurants'),
    endpoints: (builder) => ({
        getRestaurants: builder.query<RestaurantResponse, RestaurantRequest>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            }),
        }),
    }),
})

export const { useGetRestaurantsQuery } = restaurantAPI