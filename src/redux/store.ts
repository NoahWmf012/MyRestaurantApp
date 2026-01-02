import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { combineReducers } from "redux";
import { showErrModalState, showRouletteModalState, showVoteModalState } from "./reducers/modalVisibleSlice";
import { userInfoSlice } from "./reducers/userInfoSlice";
import { authAPI } from "./services/api/authAPI";
import { restaurantAPI } from "./services/api/restaurantAPI";
import { voteAPI } from "./services/api/voteAPI";
import { authSlice } from "./reducers/authSlice";

const reducer = combineReducers({
    //frontend states
    userInfoState: userInfoSlice.reducer,
    showErrModalState: showErrModalState.reducer,
    showRouletteModalState: showRouletteModalState.reducer,
    showVoteModalState: showVoteModalState.reducer,
    authState: authSlice.reducer,

    //API reducers
    [authAPI.reducerPath]: authAPI.reducer,
    [restaurantAPI.reducerPath]: restaurantAPI.reducer,
    [voteAPI.reducerPath]: voteAPI.reducer,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(
        authAPI.middleware,
        restaurantAPI.middleware,
        voteAPI.middleware,
    ),
    devTools: import.meta.PROD === false,
    // devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type StoreType = typeof store

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;