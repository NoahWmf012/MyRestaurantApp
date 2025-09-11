import { createSlice } from "@reduxjs/toolkit"

export interface ModalVisibleState {
    visible: boolean
}

const initialState = {
    visible: false
} as ModalVisibleState

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
export const showErrModalState = createGenericModalVisible({
    name: 'showErrModal',
})

export const {
    show: showErrModal,
    hide: hideErrModal
} = showErrModalState.actions
//#endregion

//#region Roulette Modal
export const showRouletteModalState = createGenericModalVisible({
    name: 'showRouletteModal',
})

export const {
    show: showRouletteModal,
    hide: hideRouletteModal
} = showRouletteModalState.actions
//#endregion