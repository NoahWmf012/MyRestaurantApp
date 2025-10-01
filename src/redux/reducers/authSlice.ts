import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AuthInterface {
    accessToken: string;
    refreshToken: string;
    expiredIn?: number;
}

const initialState = {
    accessToken: '',
    refreshToken: '',
    expiredIn: undefined
} as AuthInterface

export const authSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        setAuthInfo(state, { payload }: PayloadAction<AuthInterface>) {
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.expiredIn = payload.expiredIn
        },
        setApiToken(state, { payload }: PayloadAction<string>) {
            state.accessToken = payload
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
        builder.addCase(setAuthInfo, (state) => {
            localStorage.setItem('authInfo', JSON.stringify(state))
        })
        builder.addCase(clearAuthInfo, () => {
            localStorage.removeItem('authInfo')
        })
    },
})

export const {
    setAuthInfo,
    setApiToken,
    setRefreshToken,
    clearAuthInfo
} = authSlice.actions
