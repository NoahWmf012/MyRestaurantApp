export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiredIn?: number;
    userId: string;
    userName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpResponse {
    message: string;
}

export interface SignUpRequest {
    username: string;
    password: string;
    email: string;
}

export interface ForgetPasswordRequest {
    email: string;
}

export interface ForgetPasswordResponse {
    message: string;
}

export interface FreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken?: string;
    refreshToken?: string;
    expiredIn?: number;
}

export interface GuestLoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: User;
}

export interface GuestLoginRequest {
    userName: string
}

export interface User {
    id: string;
    email: string;
    userName: string;
    role: string;
    is_anonymous: boolean;
    // "created_at": "2025-10-08T14:48:47.892896Z",
    // "updated_at": "2025-10-08T14:48:47.928814Z",
}