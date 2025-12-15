import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { RestaurantRequest, RestaurantResponse } from '../../../interfaces/queryInterface/restaurantInterface'
import type { RestaurantPrismaInterface } from '../../../interfaces/schemaPrismaInterface'

export const restaurantAPI = createApi({
    reducerPath: 'restaurantAPI',
    baseQuery: fetchBaseQueryAuth('restaurants'),
    endpoints: (builder) => ({
        getRestaurants: builder.query<RestaurantResponse, RestaurantRequest>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            }),
        }),
        getRestaurantById: builder.query<RestaurantPrismaInterface, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetRestaurantsQuery } = restaurantAPI