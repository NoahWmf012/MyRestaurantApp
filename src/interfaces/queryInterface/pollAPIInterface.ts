export interface PollResponse {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
    expiresAt: string;
    options: PollOption[];
    isActive: boolean;
    shareToken: string;
}

export interface PollOption {
    restaurantId: number;
    restaurantName: string;
    votes: Vote[];
    pollOptionId: number;
}

export interface Vote {
    userId: string;
    userName: string;
    restaurantId: number;
    pollOptionId: number;
}

export interface CreatePollRequest {
    title: string;
    description: string | undefined;
    expiresAt: Date;
    options: CreatePollOptions[];
}

export interface CreatePollOptions {
    restaurantId?: number | undefined;
    restaurantName: string;
}

export interface VoteRequest {
    pollId: number;
    optionId: number;
    guestId?: string;
}