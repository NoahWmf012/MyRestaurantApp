import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AuthInterface {
    accessToken: string;
    refreshToken: string;
    expiredIn?: number;
}

// Function to load auth state from localStorage
export const loadAuthFromStorage = (): AuthInterface => {
    try {
        const stored = localStorage.getItem('authInfo')
        if (stored) {
            const parsed = JSON.parse(stored) as AuthInterface
            return {
                accessToken: parsed.accessToken || '',
                refreshToken: parsed.refreshToken || '',
                expiredIn: parsed.expiredIn
            }
        }
    } catch (error) {
        console.error('Error loading auth from localStorage:', error)
        localStorage.removeItem('authInfo') // Clear corrupted data
    }

    return {
        accessToken: '',
        refreshToken: '',
        expiredIn: undefined
    }
}

const initialState = loadAuthFromStorage()

export const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuthInfo(state, { payload }: PayloadAction<AuthInterface>) {
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.expiredIn = payload.expiredIn

            localStorage.setItem('authInfo', JSON.stringify({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                expiredIn: state.expiredIn
            }))
        },
        setApiToken(state, { payload }: PayloadAction<string>) {
            state.accessToken = payload

            const currentAuth = {
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                expiredIn: state.expiredIn
            }
            localStorage.setItem('authInfo', JSON.stringify(currentAuth))
        },
        setRefreshToken(state, { payload }: PayloadAction<string>) {
            state.refreshToken = payload

            const currentAuth = {
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                expiredIn: state.expiredIn
            }
            localStorage.setItem('authInfo', JSON.stringify(currentAuth))
        },
        clearAuthInfo(state) {
            // Clear state
            state.accessToken = ''
            state.refreshToken = ''
            state.expiredIn = undefined

            // Clear localStorage
            localStorage.removeItem('authInfo')
            //redirect to home page
            window.location.href = import.meta.env.VITE_BASE_URL || '/'
        },
        initializeAuthFromStorage(state) {
            const authData = loadAuthFromStorage()
            state.accessToken = authData.accessToken
            state.refreshToken = authData.refreshToken
            state.expiredIn = authData.expiredIn
        }
    },
})

export const {
    setAuthInfo,
    setApiToken,
    setRefreshToken,
    clearAuthInfo,
    initializeAuthFromStorage
} = authSlice.actions

//check if user is logged in
export const isLoggedIn = (): boolean => {
    const stored = localStorage.getItem('authInfo')
    if (stored) {
        try {
            const auth = JSON.parse(stored) as AuthInterface
            return !!auth.accessToken
        } catch (error) {
            console.error('Error parsing auth info from localStorage:', error)
            return false
        }
    }
    return false
}