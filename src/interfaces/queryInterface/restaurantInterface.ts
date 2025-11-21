import type { SearchCriteria } from "./searchCriteriaInterface";

export interface RestaurantResponse {
    restaurantList: RestaurantItem[];
}

export interface RestaurantRequest {
    query?: string;
    searchCriteria?: SearchCriteria[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface RestaurantItem {
    id: number;
    name: string;
    address?: string;
    location?: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
    minPrice: number;
    maxPrice: number;
    rating?: number;
    reviews?: number;
    openingHours?: string;
    cuisine?: string[];
    photos: string[]; // Array of photo URLs
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SuggestedItem {
    keyword: string;
    value: string;
    image: string;
}