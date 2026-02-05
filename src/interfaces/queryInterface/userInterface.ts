export interface GetProfileResponse {
    id: string;
    email: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}

export interface BookmarkGroupRequest {
    name: string;
    groupId: number;
    description?: string;
    color?: string;
    order?: number;
}

export interface BookmarkRequest {
    restaurantId: number;
    bookmarkGroupId?: number;
}