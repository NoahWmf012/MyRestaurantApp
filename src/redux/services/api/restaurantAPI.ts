import { createApi, } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryAuth } from '../keycloak'
import type { HomePageRecommendedRestaurantsResponse, RestaurantRequest, RestaurantResponse, RestaurantReviewRequest, RestaurantReviewResponse } from '../../../interfaces/queryInterface/restaurantInterface'
import type { PromoteRestaurantPrismaInterface, RestaurantPrismaInterface } from '../../../interfaces/schemaPrismaInterface'

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
                url: `list/${id}`,
                method: 'GET',
            }),
        }),
        postRestaurantReview: builder.mutation<RestaurantReviewResponse, RestaurantReviewRequest>({
            query: (body) => ({
                url: 'review',
                method: 'POST',
                body
            }),
        }),
        getRecommendedRestaurant: builder.query<PromoteRestaurantPrismaInterface, number>({
            query: (restaurantId) => ({
                url: `recommended-restaurant/${restaurantId}`,
                method: 'GET',
            }),
        }),
        getHomePageRecommendedRestaurants: builder.query<HomePageRecommendedRestaurantsResponse[], void>({
            query: () => ({
                url: 'home-recommended',
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetRestaurantsQuery, useGetRestaurantByIdQuery, usePostRestaurantReviewMutation, useGetRecommendedRestaurantQuery, useGetHomePageRecommendedRestaurantsQuery } = restaurantAPI