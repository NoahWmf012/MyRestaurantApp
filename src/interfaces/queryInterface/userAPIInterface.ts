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
    user: User | null;
    session: Session | null;
}

export interface GuestLoginRequest {
    userName: string
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface Session {
    id: string;
    userId: string;
    createdAt: string;
    expiresAt: string;
}