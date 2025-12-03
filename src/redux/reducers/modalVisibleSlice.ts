import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface ModalVisibleState {
    visible: boolean
}

export interface ErrModalState {
    visible: boolean
    title: string
    message: string
    type?: 'error' | 'warning' | 'info' | 'success'
}

const initialState = {
    visible: false
} as ModalVisibleState

const errModalInitialState: ErrModalState = {
    visible: false,
    title: '',
    message: '',
    type: 'error'
}

const createGenericModalVisible = ({
    name = ''
}: {
    name: string
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            show(state) {
                state.visible = true
            },
            hide(state) {
                state.visible = false
            }
        }
    }
    )
}

//#region Error Modal
export const showErrModalState = createSlice({
    name: 'showErrModalState',
    initialState: errModalInitialState,
    reducers: {
        show(state, action: PayloadAction<{ title?: string; message: string; type?: 'error' | 'warning' | 'info' | 'success' }>) {
            state.visible = true
            state.title = action.payload.title || 'Error'
            state.message = action.payload.message
            state.type = action.payload.type || 'error'
        },
        hide(state) {
            state.visible = false
            state.title = ''
            state.message = ''
        }
    }
})

export const {
    show: showErrModal,
    hide: hideErrModal
} = showErrModalState.actions
//#endregion

//#region Roulette Modal
export const showRouletteModalState = createGenericModalVisible({
    name: 'showRouletteModalState',
})

export const {
    show: showRouletteModal,
    hide: hideRouletteModal
} = showRouletteModalState.actions
//#endregion

//#region Vote Modal
export const showVoteModalState = createGenericModalVisible({
    name: 'showVoteModalState',
})

export const {
    show: showVoteModal,
    hide: hideVoteModal
} = showVoteModalState.actions
//#endregion