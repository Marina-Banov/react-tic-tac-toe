import { createSlice } from '@reduxjs/toolkit'

export const PvPModeSlice = createSlice({
    name: 'PvPMode',
    initialState: {
        value: true
    },
    reducers: {
        activate: state => {
            state.value = true
        },
        deactivate: state => {
            state.value = false
        }
    }
})

export const { activate, deactivate } = PvPModeSlice.actions
export const selectMode = state => state.PvPMode.value
export default PvPModeSlice.reducer
