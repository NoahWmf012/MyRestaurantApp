import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UserInfoInterface {
    userId: string
    userName: string
}

// Function to load auth state from localStorage
const loadUserInfoFromStorage = (): UserInfoInterface => {
    try {
        const stored = localStorage.getItem('userInfo')
        if (stored) {
            const parsed = JSON.parse(stored) as UserInfoInterface
            return {
                userId: parsed.userId || '',
                userName: parsed.userName || '',
            }
        }
    } catch (error) {
        console.error('Error loading user info from localStorage:', error)
        localStorage.removeItem('userInfo') // Clear corrupted data
    }

    return {
        userId: '',
        userName: ''
    }
}

const initialState = loadUserInfoFromStorage()

export const userInfoSlice = createSlice({
    name: 'userInfoState',
    initialState,
    reducers: {
        setUserInfo(state, { payload }: PayloadAction<UserInfoInterface>) {
            state.userId = payload.userId
            state.userName = payload.userName

            // Handle localStorage persistence directly in the reducer
            localStorage.setItem('userInfo', JSON.stringify({
                userId: state.userId,
                userName: state.userName,
            }))
        },
        clearUserInfo() {
            localStorage.removeItem('userInfo')
            return initialState
        }
    }
})

export const {
    setUserInfo,
    clearUserInfo
} = userInfoSlice.actions
