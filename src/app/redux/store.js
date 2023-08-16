import { configureStore } from '@reduxjs/toolkit'
import photoReducer from './slices/photoReducer'
import userReducer from './slices/userReducer'

export const store = configureStore({
  reducer: {
    photos: photoReducer,
    user: userReducer,
  },
})