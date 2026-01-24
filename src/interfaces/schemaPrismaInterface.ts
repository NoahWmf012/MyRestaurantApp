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
    province?: string;
    postalCode?: string;
    address: string;
    latitude: number;
    longitude: number;
    location: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
    minPrice: number;
    maxPrice: number;
    googleRating?: number;
    googleReviews?: number;
    ratingGood: number;
    ratingNormal: number;
    ratingBad: number;
    reviewCount: number;
    openingHours?: string;
    cuisine: string[];
    photos: string[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;

    restaurantI18ns: RestaurantI18nPrismaInterface[]
    reviews: ReviewPrismaInterface[]
    bookmarkedBy: BookmarkPrismaInterface[]
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