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

//getHomePageRecommendedRestaurants API
export interface HomePageRecommendedRestaurantsResponse {
    id: number;
    restaurantId: number;
    photoUrls?: string[];
    description?: string[];
    restaurantName?: string;
    restaurantDescription?: string;
}