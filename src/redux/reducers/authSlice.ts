import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AuthInterface {
    apiToken: string;
    refreshToken: string;
    expiredIn?: number;
}

const initialState = {
    apiToken: '',
    refreshToken: '',
    expiredIn: undefined
} as AuthInterface

export const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuthInfo(state, { payload }: PayloadAction<AuthInterface>) {
            state.apiToken = payload.apiToken
            state.refreshToken = payload.refreshToken
            state.expiredIn = payload.expiredIn
        },
        setApiToken(state, { payload }: PayloadAction<string>) {
            state.apiToken = payload
        },
        setRefreshToken(state, { payload }: PayloadAction<string>) {
            state.refreshToken = payload
        },
        clearAuthInfo() {
            return initialState
        }
    },
    //set extra reducers for local storage persistence
    extraReducers(builder) {
        builder.addCase(setRefreshToken, (state) => {
            localStorage.setItem('refreshToken', state.refreshToken)
        })
        builder.addCase(clearAuthInfo, () => {
            localStorage.removeItem('refreshToken')
        })
    },
})

export const {
    setAuthInfo,
    setApiToken,
    setRefreshToken,
    clearAuthInfo
} = authSlice.actions
