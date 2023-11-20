import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { type } from "os";

// const LOCAL_SERVER = "http://localhost:9400";
const PRODUCTION_SERVER = "https://testapp-server.vercel.app";

const signIn = createAsyncThunk(
  "user/signIn",
  async ({ password, email }: { password: string; email: string }) => {
    try {
      const response = await axios.post(`${PRODUCTION_SERVER}/signin`, {
        password,
        email,
      });

      const { token, name } = response.data;
      localStorage.setItem("token", "Bearer " + token);

      return {
        name,
        email,
      };
    } catch (error) {
      return "error signIn";
    }
  }
);

const signUp = createAsyncThunk(
  "user/signUp",
  async ({
    name,
    password,
    email,
  }: {
    name: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await axios.post(`${PRODUCTION_SERVER}/signup`, {
        name,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      return "error signUp";
    }
  }
);

export type initialStateType = {
  data: {
    name: string;
    email: string;
  };
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const initialState: initialStateType = {
  data: {
    name: "",
    email: "",
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    clearUserData: (state, action) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    // signIn ------------------------------
    builder.addCase(signIn.pending, (state: { isLoading: boolean }, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(
      signIn.fulfilled,
      (
        state: { isLoading: boolean; isSuccess: boolean; data: any },
        action: { payload: any }
      ) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      }
    );
    builder.addCase(
      signIn.rejected,
      (state: { isLoading: boolean; isError: boolean }, action: any) => {
        state.isLoading = false;
        state.isError = true;
      }
    );
    // signUp ------------------------------
    builder.addCase(signUp.pending, (state: { isLoading: boolean }, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(
      signUp.fulfilled,
      (state: { isLoading: boolean; isSuccess: boolean }, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      signUp.rejected,
      (state: { isLoading: boolean; isError: boolean }, action: any) => {
        state.isLoading = false;
        state.isError = true;
      }
    );
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export { signIn, signUp };

export const selectDataUser = (state: { user: { data: any } }) => state.user.data;

export default userSlice.reducer;
