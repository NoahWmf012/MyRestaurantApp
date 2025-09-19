import { createSlice } from "@reduxjs/toolkit"

export interface UserInfoInterface {
  userId: string
  userName: string
  avatarUrl: string
}

const initialState = {
  userId: '',
  userName: '',
  avatarUrl: ''
} as UserInfoInterface

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.avatarUrl = action.payload.avatarUrl
    },
    clearUserInfo(state) {
      state.userId = ''
      state.userName = ''
      state.avatarUrl = ''
    }
  }
})

export const {
  setUserInfo,
  clearUserInfo
} = userInfoSlice.actions
//#endregion