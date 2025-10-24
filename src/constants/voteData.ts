export interface Vote {
    userId: string;
    userName: string;
    restaurantId: number;
}

export interface CurrentUserInterface {
    userId: string;
    userName: string;
}

export interface PollOption {
    restaurantId: number;
    restaurantName: string;
    votes: Vote[];
}

export interface Poll {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
    expiresAt: string;
    options: PollOption[];
    isActive: boolean;
}
