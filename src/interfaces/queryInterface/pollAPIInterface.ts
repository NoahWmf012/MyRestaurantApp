export interface PollResponse {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
    expiresAt: string;
    options: PollOption[];
    isActive: boolean;
}

export interface PollOption {
    restaurantId: number;
    restaurantName: string;
    votes: Vote[];
}

export interface Vote {
    userId: string;
    userName: string;
    restaurantId: number;
}

export interface CreatePollRequest {
    title: string;
    description?: string;
    createdBy: string; // User ID
    expiresAt: Date;
    userIds: string[];
    options: CreatePollOptions[];
}

export interface CreatePollOptions {
    restaurantName: string;
    restaurantId?: number;
}