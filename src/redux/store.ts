import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { combineReducers } from "redux";
import { showErrModalState, showRouletteModalState, showVoteModalState } from "./reducers/modalVisibleSlice";

const reducer = combineReducers({
    //frontend states
    showErrModalState: showErrModalState.reducer,
    showRouletteModalState: showRouletteModalState.reducer,
    showVoteModalState: showVoteModalState.reducer,

    //API reducers
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(
        // API middlewares go here
    ),
    devTools: import.meta.PROD === false,
    // devTools: true,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            // API middlewares go here
        ),
        preloadedState
    })
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type StoreType = typeof store

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof setupStore>