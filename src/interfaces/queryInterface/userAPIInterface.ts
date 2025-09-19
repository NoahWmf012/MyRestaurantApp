export interface SignInResponse {
    token: string;
    userId: string;
    userName: string;
}

export interface SignInRequest {
    username: string;
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

export interface UserProfileResponse {
    userId: string;
    userName: string;
    email: string;
}