export interface PaginatedResponse {
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface PaginatedRequest {
    page?: number; // Page number (1-indexed)
    pageSize?: number; // Items per page
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;