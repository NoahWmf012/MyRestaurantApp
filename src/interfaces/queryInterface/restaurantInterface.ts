import type { PaginatedRequest, PaginatedResponse, SortFilterInterface } from "./base.types";
import type { SearchCriteria } from "./searchCriteriaInterface";

export interface RestaurantResponse extends PaginatedResponse {
    restaurantList: RestaurantItem[];
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
    name: string;
    id: number;
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
    minPrice: number;
    maxPrice: number;
    rating: number | null;
    reviews: number | null;
    openingHours: string | null;
    cuisine: string[];
    photos: string[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SuggestedItem {
    keyword: string;
    value: string;
    image: string;
}