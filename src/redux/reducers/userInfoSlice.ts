import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UserInfoInterface {
    userId: string
    userName: string
}

const initialState = {
    userId: '',
    userName: '',
} as UserInfoInterface

export const userInfoSlice = createSlice({
    name: 'userInfoState',
    initialState,
    reducers: {
        setUserInfo(state, { payload }: PayloadAction<UserInfoInterface>) {
            state.userId = payload.userId
            state.userName = payload.userName
        },
        clearUserInfo() {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setUserInfo, (state) => {
            localStorage.setItem('userInfo', JSON.stringify(state))
        })
        builder.addCase(clearUserInfo, () => {
            localStorage.removeItem('userInfo')
        })
    }
})

export const {
    setUserInfo,
    clearUserInfo
} = userInfoSlice.actions
//#endregion