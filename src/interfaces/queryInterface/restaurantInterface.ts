import type { SearchCriteria } from "./searchCriteriaInterface";

export interface RestaurantResponse {
    restaurantList: RestaurantItem[];
}

export interface RestaurantRequest {
    query: string;
    searchCriteria?: SearchCriteria[];
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
    cuisine?: string;
    photos: string[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
