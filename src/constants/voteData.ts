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

// Dummy poll data
export const DUMMY_POLLS: Poll[] = [
    {
        id: 1,
        title: "Lunch Spot for Tomorrow",
        description: "Where should we go for lunch tomorrow? Vote for your favorite!",
        createdBy: "Alice",
        createdAt: "2024-12-17T10:00:00Z",
        expiresAt: "2028-12-20T12:00:00Z",
        isActive: true,
        options: [
            {
                restaurantId: 1,
                restaurantName: "Dragon Palace",
                votes: [
                    { userId: "user1", userName: "Alice", restaurantId: 1 },
                    { userId: "user2", userName: "Bob", restaurantId: 1 },
                ]
            },
            {
                restaurantId: 2,
                restaurantName: "Sakura Sushi",
                votes: [
                    { userId: "user3", userName: "Charlie", restaurantId: 2 },
                ]
            },
            {
                restaurantId: 3,
                restaurantName: "Mama's Pizzeria",
                votes: [
                    { userId: "user4", userName: "Diana", restaurantId: 3 },
                    { userId: "user5", userName: "Eve", restaurantId: 3 },
                    { userId: "user6", userName: "Frank", restaurantId: 3 },
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Weekend Dinner",
        description: "Let's decide on a nice place for Saturday dinner!",
        createdBy: "Bob",
        createdAt: "2024-12-17T15:30:00Z",
        expiresAt: "2030-12-19T18:00:00Z",
        isActive: true,
        options: [
            {
                restaurantId: 4,
                restaurantName: "The Steakhouse",
                votes: [
                    { userId: "user1", userName: "Alice", restaurantId: 4 },
                    { userId: "user7", userName: "Grace", restaurantId: 4 },
                ]
            },
            {
                restaurantId: 5,
                restaurantName: "Ocean View Seafood",
                votes: [
                    { userId: "user2", userName: "Bob", restaurantId: 5 },
                    { userId: "user3", userName: "Charlie", restaurantId: 5 },
                    { userId: "user8", userName: "Henry", restaurantId: 5 },
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Team Building Lunch",
        description: "Company team building event - vote for the restaurant!",
        createdBy: "Charlie",
        createdAt: "2024-12-16T09:00:00Z",
        expiresAt: "2024-12-17T16:00:00Z",
        isActive: false,
        options: [
            {
                restaurantId: 1,
                restaurantName: "Dragon Palace",
                votes: [
                    { userId: "user1", userName: "Alice", restaurantId: 1 },
                    { userId: "user4", userName: "Diana", restaurantId: 1 },
                ]
            },
            {
                restaurantId: 2,
                restaurantName: "Sakura Sushi",
                votes: [
                    { userId: "user2", userName: "Bob", restaurantId: 2 },
                    { userId: "user3", userName: "Charlie", restaurantId: 2 },
                    { userId: "user5", userName: "Eve", restaurantId: 2 },
                    { userId: "user6", userName: "Frank", restaurantId: 2 },
                    { userId: "user7", userName: "Grace", restaurantId: 2 },
                ]
            }
        ]
    }
];

// Current user for demo purposes
export const CURRENT_USER = {
    userId: "user1",
    userName: "Alice"
};
