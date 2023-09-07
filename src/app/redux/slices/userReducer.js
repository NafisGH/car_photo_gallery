import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const LOCAL_SERVER = "http://localhost:9400";
const PRODUCTION_SERVER = "https://testapp-server.vercel.app";

const getDefaultDataUser = () => {
  const saveData = JSON.parse(localStorage.getItem("user"));
  if (saveData) {
    const { name, email } = saveData;
    return {
      name,
      email,
    };
  } else {
    return {
      name: "",
      email: "",
    };
  }
};

const signIn = createAsyncThunk("user/signIn", async ({ password, email }) => {
  try {
    const response = await axios.post(`${PRODUCTION_SERVER}/signin`, {
      password,
      email,
    });

    const { token, name: nameUser, email: emailUser } = response.data;
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: `Bearer ${token}`,
        name: nameUser,
        email: emailUser,
      })
    );

    return response.data;
  } catch (error) {
    return "error signIn";
  }
});

const signUp = createAsyncThunk(
  "user/signUp",
  async ({ userName, password, email }) => {
    try {
      const response = await axios.post(`${PRODUCTION_SERVER}/signup`, {
        userName,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      return "error signUp";
    }
  }
);

const initialState = {
  data: getDefaultDataUser(),
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // signIn ------------------------------
    [signIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      const { email, name } = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.data = {
        name,
        email,
      };
    },
    [signIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    // signUp ------------------------------
    [signUp.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {} = userSlice.actions;

export { signIn, signUp };

export const selectDataUser = (state) => state.user.data;

export default userSlice.reducer;
