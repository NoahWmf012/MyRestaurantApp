// Refer to prisma/schema.prisma

//==================================================
// CORE SCHEMA - User and Authentication
//==================================================
export interface UserPrismaInterface {
    id: string;
    email: string;
    userName: string;
    avatarUrl?: string | null;
    bio?: string | null;
    role: string; // "user" | "admin" | "guest"
    createdAt: Date;
    updatedAt: Date;

    // Relations
    bookmarkedRestaurants: BookmarkPrismaInterface[]; //Favorite Restaurants
    bookmarkGroups: BookmarkGroupPrismaInterface[]; // Define BookmarkGroupPrismaInterface if needed
    reviews: ReviewPrismaInterface[];
    polls: PollPrismaInterface[];
    followers: UserFollowPrismaInterface[];
    following: UserFollowPrismaInterface[];
}

export interface UserFollowPrismaInterface {
    id: number;
    followerId: string; // User who follows
    followingId: string; // User being followed
    createdAt: Date;
}

//==================================================
// RESTAURANT SCHEMA - Restaurant Data
//==================================================

export interface RestaurantPrismaInterface {
    id: number;
    name: string;
    streetAddress: string;
    city: string;
    province?: string | null;
    postalCode?: string | null;
    address: string;
    latitude: number;
    longitude: number;
    location: string;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    description?: string | null;
    minPrice: number;
    maxPrice: number;
    googleRating?: number | null;
    googleReviews?: number | null;
    openingHours?: string | null;
    createdAt: Date;
    updatedAt: Date;

    // Relations
    restaurantI18ns?: RestaurantI18nPrismaInterface[] | null;
    reviews?: ReviewPrismaInterface[] | null;
    bookmarkedBy?: BookmarkPrismaInterface[] | null;
    promoteRestaurant?: PromoteRestaurantPrismaInterface | null;
    keySearchRestaurants?: KeySearchRestaurantPrismaInterface[] | null;
    photos?: RestaurantPhotoPrismaInterface[] | null; // Define if needed
    cuisines?: RestaurantCuisinePrismaInterface[] | null; // Define if needed
    tags?: RestaurantTagPrismaInterface[] | null; // Define if needed
    ratingStats?: RestaurantRatingStatsPrismaInterface | null; // Define if needed
}

export interface RestaurantI18nPrismaInterface {
    id: number;
    restaurantId: number;
    zhHkName?: string;
    zhHkDescription?: string;
    zhCnName?: string;
    zhCnDescription?: string;
    frName?: string;
    frDescription?: string;
}

export interface RestaurantPhotoPrismaInterface {
    id: number;
    restaurantId: number;
    url: string;
    order: number;
    createdAt: Date;
}

export interface RestaurantCuisinePrismaInterface {
    id: number;
    restaurantId: number;
    cuisine: string;
}

export interface RestaurantTagPrismaInterface {
    id: number;
    restaurantId: number;
    tag: string;
}

export interface RestaurantRatingStatsPrismaInterface {
    id: number;
    restaurantId: number;
    ratingGood: number;
    ratingNormal: number;
    ratingBad: number;
    reviewCount: number;
    updatedAt: Date;
}

export interface PromoteRestaurantPrismaInterface {
    id: number;
    restaurantId: number;
    photoUrls: string[];
    description: string[];
    isActive: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    createdAt: Date;

    restaurant: RestaurantPrismaInterface;
    promoteRestaurantI18n?: PromoteRestaurantI18nPrismaInterface | null;
}


export interface PromoteRestaurantI18nPrismaInterface {
    id: number;
    promoteRestaurantId: number;
    zhHkText?: string; // Chinese (Traditional)
    zhCnText?: string; // Chinese (Simplified)
    frText?: string; // French
}

export interface KeySearchRestaurantPrismaInterface {
    id: number;
    restaurantId: number;
    keyword: string;
    value: string;
    imageUrl?: string | null;
}

//==================================================
// SOCIAL SCHEMA - Reviews, Ratings, and Reactions
//==================================================

export enum Rating {
    GOOD = 'GOOD',
    NORMAL = 'NORMAL',
    BAD = 'BAD'
}

export interface BookmarkPrismaInterface {
    id: number;
    userId: string;
    restaurantId: number;
    createdAt: Date;
    bookmarkGroup?: BookmarkGroupPrismaInterface;
}

export interface BookmarkGroupPrismaInterface {
    id: number;
    userId: string;
    name: string;
    description?: string | null;
    color?: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewPrismaInterface {
    id: number;
    restaurantId: number;
    userId: string;
    title?: string | null;
    content?: string | null; // Review text
    rating: Rating; // Simple rating: GOOD, NORMAL, BAD
    // Cached counts (updated via triggers or application logic)
    likeCount: number;
    viewCount: number;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Relations
    restaurant: RestaurantPrismaInterface;
    user: UserPrismaInterface;
    photos: ReviewPhotoPrismaInterface[];
}

export interface ReviewPhotoPrismaInterface {
    id: number;
    reviewId: number;
    imageUrl: string;
    caption?: string | null;
    order: number;
    uploadedAt: Date;
}

//==================================================
// FEATURE SCHEMA - Polls and Other Features
//==================================================
export interface PollPrismaInterface {
    id: number;
    title: string;
    description?: string;
    createdBy: string; // User ID of poll creator
    expiresAt?: Date;
    isActive: boolean;
    shareToken: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PollSharePrismaInterface {
    id: number;
    pollId: number;
    userId: string;
    sharedAt: Date;
}

export interface PollOptionPrismaInterface {
    id: number;
    restaurantId?: number | null;
    restaurantName: string;
    description?: string | null;
    pollId: number;
    createdAt: Date;
}

export interface PollVotePrismaInterface {
    id: number;
    userId: string;
    userName: string;
    pollId: number;
    pollOptionId: number;
    votedAt: Date;
}