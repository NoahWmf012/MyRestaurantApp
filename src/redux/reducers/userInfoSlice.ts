import { createSlice } from "@reduxjs/toolkit"

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
        setUserInfo(state, action) {
            state.userId = action.payload.userId
            state.userName = action.payload.userName
        },
        clearUserInfo(state) {
            state.userId = ''
            state.userName = ''
        }
    }
})

export const {
    setUserInfo,
    clearUserInfo
} = userInfoSlice.actions
//#endregion