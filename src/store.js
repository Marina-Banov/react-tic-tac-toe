import { configureStore } from '@reduxjs/toolkit'
import PvPModeReducer from './slices/PvPModeSlice'

export default configureStore({
    reducer: {
        PvPMode: PvPModeReducer
    }
})
