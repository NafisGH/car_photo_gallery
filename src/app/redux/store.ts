import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./slices/photoReducer";
import userReducer from "./slices/userReducer";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
