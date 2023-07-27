import { configureStore } from '@reduxjs/toolkit'
import photoReducer from './slices/photoReducer'

export const store = configureStore({
  reducer: {
    photos: photoReducer
  },
})