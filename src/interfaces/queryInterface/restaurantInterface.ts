import type { Rating, RestaurantPrismaInterface } from "../schemaPrismaInterface";
import type { PaginatedRequest, PaginatedResponse, SortFilterInterface } from "./base.types";
import type { SearchCriteria } from "./searchCriteriaInterface";

export interface RestaurantResponse extends PaginatedResponse {
    restaurantList: RestaurantPrismaInterface[];
}

export interface RestaurantRequest extends PaginatedRequest, SortFilterInterface {
    query?: string;
    searchCriteria?: SearchCriteria[];
    location?: {
        latitude: number;
        longitude: number;
        radiusKm: number;
    };
    language?: string;
}

export interface RestaurantItem { //import type { Restaurant } from '@prisma/client';
    id: number;
    name: string | null;
    streetAddress: string | null;
    city: string | null;
    province: string | null;
    postalCode: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    location: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    description: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    googleRating: number | null;
    googleReviews: number | null;
    ratingGood: number | null;
    ratingNormal: number | null;
    ratingBad: number | null;
    reviewCount: number | null;
    openingHours: string | null;
    cuisine: string[] | null;
    photos: string[] | null;
    tags: string[] | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface RestaurantReviewRequest {
    restaurantId: number;
    rating: Rating;
    comment?: string;
    title?: string;
    content?: string
}

export interface RestaurantReviewResponse {
    message: string;
}

export interface SuggestedItem {
    keyword: string;
    value: string;
    image: string;
}