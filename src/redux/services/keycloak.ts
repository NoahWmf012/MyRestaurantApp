import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import type { AuthInterface } from "../reducers/authSlice";
import { setAuthInfo, clearAuthInfo } from "../reducers/authSlice";
import type { RefreshTokenResponse } from "../../interfaces/queryInterface/userAPIInterface";
import { AUTH_INFO_KEY } from "../../constants/authConstant";
import { showErrModal } from "../reducers/modalVisibleSlice";
import { store } from "../store";

// get JWT from localStorage
const getAccessToken = (): string => {
    const stored = localStorage.getItem(AUTH_INFO_KEY)
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as AuthInterface
            return parsed.accessToken || ''
        } catch (error) {
            console.error('Error parsing authInfo from localStorage:', error)
            localStorage.removeItem(AUTH_INFO_KEY) // Clear corrupted data
        }
    }
    return ''
}

// get refresh token from localStorage
const getRefreshToken = (): string => {
    const stored = localStorage.getItem(AUTH_INFO_KEY)
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as AuthInterface
            return parsed.refreshToken || ''
        } catch (error) {
            console.error('Error parsing authInfo from localStorage:', error)
            localStorage.removeItem(AUTH_INFO_KEY) // Clear corrupted data
        }
    }
    return ''
}

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string | null> => {
    const baseServerUrl = import.meta.env.VITE_SERVER_URL
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
        console.log('No refresh token available')
        store.dispatch(showErrModal({
            message: 'Your session has expired. Please log in again to continue.',
            title: 'Session Expired',
            type: 'warning'
        }));
        return null
    }

    try {
        const response = await fetch(`${baseServerUrl}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        })

        if (response.ok) {
            const data: RefreshTokenResponse = await response.json()

            if (data.accessToken) {
                // Update the tokens in localStorage and Redux store
                const currentAuth = JSON.parse(localStorage.getItem(AUTH_INFO_KEY) || '{}') as AuthInterface
                const updatedAuth: AuthInterface = {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken || currentAuth.refreshToken,
                    expiredIn: data.expiredIn || currentAuth.expiredIn
                }

                localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(updatedAuth))

                return data.accessToken
            }
        } else {
            console.log('Failed to refresh token, response not ok')
            return null
        }
    } catch (error) {
        console.error('Error refreshing token:', error)
        return null
    }

    return null
}

export const fetchBaseQueryAuth = (endpoints?: string) => {
    const baseUrl = import.meta.env.VITE_SERVER_URL + (endpoints || '');
    return async (args: string | FetchArgs, api: BaseQueryApi) => {
        const localToken = getAccessToken()

        const baseQuery = fetchBaseQuery({
            baseUrl,
            prepareHeaders: (headers) => {
                if (localToken) {
                    headers.set('Authorization', `Bearer ${localToken}`)
                }
                return headers
            }
        })

        let result = await baseQuery(args, api, {})

        // If we get a 401 (Unauthorized) response, try to refresh the token
        if (result.error && 'status' in result.error && result.error.status === 401) {
            console.log('Token expired, attempting to refresh...')

            const newToken = await refreshAccessToken()

            if (newToken) {
                // Update the Redux state with the new token
                const stored = localStorage.getItem(AUTH_INFO_KEY)
                if (stored) {
                    const authData = JSON.parse(stored) as AuthInterface
                    api.dispatch(setAuthInfo(authData))
                }

                // Retry the original request with the new token
                const retryQuery = fetchBaseQuery({
                    baseUrl,
                    prepareHeaders: (headers) => {
                        headers.set('Authorization', `Bearer ${newToken}`)
                        return headers
                    }
                })

                result = await retryQuery(args, api, {})
            } else {
                api.dispatch(clearAuthInfo())
            }
        }

        return result
    };
};

export const fetchBaseQueryNoAuth = (baseUrl: string) => {
    return fetchBaseQuery({ baseUrl });
};