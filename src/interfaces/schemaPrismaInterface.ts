/**
//==================================================
// CORE SCHEMA - User and Authentication
//==================================================

model User {
    id        String   @id // Use Supabase user ID
    email     String   @unique
    userName  String
    avatarUrl String?
    bio       String?
    role      String   @default("user") // "user" | "admin" | "guest"
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    // Relations
    reviews               Review[]
    bookmarkedRestaurants Bookmark[]
    followers             UserFollow[] @relation("Following")
    following             UserFollow[] @relation("Followers")

    @@map("users")
}

model UserFollow {
    id          Int      @id @default(autoincrement())
    followerId  String // User who follows
    followingId String // User being followed
    createdAt   DateTime @default(now())

    follower  User @relation("Followers", fields: [followerId], references: [id], onDelete: Cascade)
    following User @relation("Following", fields: [followingId], references: [id], onDelete: Cascade)

    @@unique([followerId, followingId])
    @@index([followerId])
    @@index([followingId])
    @@map("user_follows")
}

//==================================================
// RESTAURANT SCHEMA - Restaurant Data
//==================================================

model Restaurant {
    id            Int      @id @default(autoincrement())
    name          String
    streetAddress String // "#139, 3636 Steeles Ave E"
    city          String // "Markham"
    province      String? // "ON"
    postalCode    String? // "L3R 2Z5"
    address       String // Full address (keep for backward compatibility)
    latitude      Float
    longitude     Float
    location      String // Google Map url
    phone         String?
    email         String?
    website       String?
    description   String?
    minPrice      Int
    maxPrice      Int
    // Google rating and reviews from Google Maps
    googleRating  Float?
    googleReviews Int?
    // Rating stats (cached from reviews)
    ratingGood    Int      @default(0) // Count of "Good" ratings
    ratingNormal  Int      @default(0) // Count of "Normal" ratings
    ratingBad     Int      @default(0) // Count of "Bad" ratings
    reviewCount   Int      @default(0) // Total number of reviews
    openingHours  String?
    cuisine       String[]
    photos        String[] // Array of photo URLs
    tags          String[] // e.g., ["vegan", "family-friendly", "香港小炒"]
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt

    // Relations
    restaurantI18ns RestaurantI18n[]
    reviews         Review[]
    bookmarkedBy    Bookmark[]

    @@unique([name, address])
    @@index([city])
    @@index([province])
    @@index([name])
    @@index([streetAddress])
    @@index([address])
    @@index([cuisine], type: Gin)
    @@index([tags], type: Gin)
    @@map("restaurants")
}

model RestaurantI18n {
    id              Int     @id @default(autoincrement())
    restaurantId    Int
    zhHkName        String? // Chinese (Traditional)
    zhHkDescription String?
    zhCnName        String? // Chinese (Simplified)
    zhCnDescription String?
    frName          String? // French
    frDescription   String?

    restaurant Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)

    @@unique([restaurantId])
    @@map("restaurant_i18ns")
}

model PromoteRestaurant {
    id            Int       @id @default(autoincrement())
    restaurantId  Int
    promotePhotos String[] // URL of the promotional photos
    promoteText   String?
    isActive      Boolean   @default(true)
    startDate     DateTime  @default(now())
    endDate       DateTime?
    createdAt     DateTime  @default(now())

    promoteRestaurantI18n PromoteRestaurantI18n?

    @@index([restaurantId])
    @@index([isActive, startDate, endDate])
    @@map("promote_restaurants")
}

model PromoteRestaurantI18n {
    id                  Int     @id @default(autoincrement())
    promoteRestaurantId Int
    zhHkText            String? // Chinese (Traditional)
    zhCnText            String? // Chinese (Simplified)
    frText              String? // French

    promoteRestaurant PromoteRestaurant @relation(fields: [promoteRestaurantId], references: [id], onDelete: Cascade)

    @@unique([promoteRestaurantId])
    @@map("promote_restaurant_i18ns")
}

//==================================================
// SOCIAL SCHEMA - Reviews, Ratings, and Reactions
//==================================================

enum Rating {
    GOOD
    NORMAL
    BAD

    @@map("rating")
}

model Bookmark {
    id           Int      @id @default(autoincrement())
    userId       String
    restaurantId Int
    createdAt    DateTime @default(now())

    user       User       @relation(fields: [userId], references: [id], onDelete: Cascade)
    restaurant Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)

    @@unique([userId, restaurantId])
    @@index([userId])
    @@index([restaurantId])
    @@map("bookmarks")
}

model Review {
    id           Int      @id @default(autoincrement())
    restaurantId Int
    userId       String
    title        String?
    content      String? // Review text
    rating       Rating // Simple rating: GOOD, NORMAL, BAD
    // Cached counts (updated via triggers or application logic)
    likeCount    Int      @default(0)
    viewCount    Int      @default(0)
    isEdited     Boolean  @default(false)
    createdAt    DateTime @default(now())
    updatedAt    DateTime @updatedAt

    // Relations
    restaurant Restaurant    @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
    user       User          @relation(fields: [userId], references: [id], onDelete: Cascade)
    photos     ReviewPhoto[]

    @@index([restaurantId])
    @@index([userId])
    @@index([rating])
    @@index([createdAt])
    @@index([likeCount])
    @@map("reviews")
}

model ReviewPhoto {
    id         Int      @id @default(autoincrement())
    reviewId   Int
    imageUrl   String
    caption    String?
    order      Int      @default(0) // Display order
    uploadedAt DateTime @default(now())

    review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)

    @@index([reviewId])
    @@map("review_photos")
}

//==================================================
// FEATURE SCHEMA - Polls and Other Features
//==================================================

model Poll {
    id          Int       @id @default(autoincrement())
    title       String
    description String?
    createdBy   String
    expiresAt   DateTime?
    isActive    Boolean   @default(true)
    shareToken  String    @unique @default(uuid())
    createdAt   DateTime  @default(now())
    updatedAt   DateTime  @updatedAt

    options    PollOption[]
    votes      PollVote[]
    sharedWith PollShare[]

    @@index([createdBy])
    @@index([isActive])
    @@index([shareToken])
    @@map("polls")
}

model PollShare {
    id       Int      @id @default(autoincrement())
    pollId   Int
    userId   String
    sharedAt DateTime @default(now())

    poll Poll @relation(fields: [pollId], references: [id], onDelete: Cascade)

    @@unique([pollId, userId])
    @@index([pollId])
    @@index([userId])
    @@map("poll_shares")
}

model PollOption {
    id             Int      @id @default(autoincrement())
    restaurantId   Int? // Link to restaurant if exists in DB
    restaurantName String
    description    String?
    pollId         Int
    createdAt      DateTime @default(now())

    poll  Poll       @relation(fields: [pollId], references: [id], onDelete: Cascade)
    votes PollVote[]

    @@index([pollId])
    @@index([restaurantId])
    @@map("poll_options")
}

model PollVote {
    id           Int      @id @default(autoincrement())
    userId       String
    userName     String
    pollId       Int
    pollOptionId Int
    votedAt      DateTime @default(now())

    poll       Poll       @relation(fields: [pollId], references: [id], onDelete: Cascade)
    pollOption PollOption @relation(fields: [pollOptionId], references: [id], onDelete: Cascade)

    @@unique([userId, pollId]) // One vote per user per poll
    @@index([pollId])
    @@index([pollOptionId])
    @@index([userId])
    @@map("poll_votes")
}
 */

//==================================================
// SOCIAL SCHEMA - Reviews, Ratings, and Reactions
//==================================================

export enum Rating {
    GOOD = 'GOOD',
    NORMAL = 'NORMAL',
    BAD = 'BAD'
}

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

export interface ReviewPrismaInterface {
    id: number;
    restaurantId: number;
    userId: string;
    title?: string;
    content?: string;
    rating: Rating;
    likeCount: number;
    viewCount: number;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;

    //user type from getRestaurantById
    user: {
        id: string;
        userName: string;
        avatarUrl: string | null;
    };
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

export interface BookmarkPrismaInterface {
    id: number;
    userId: string;
    restaurantId: number;
    createdAt: Date;
}