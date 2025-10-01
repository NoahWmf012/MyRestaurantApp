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