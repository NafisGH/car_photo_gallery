import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const LOCAL_SERVER = "http://localhost:9400";
const PRODUCTION_SERVER = "https://testapp-server.vercel.app";

const signIn = createAsyncThunk("user/signIn", async ({ password, email }) => {
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

// export const checkToken = createAsyncThunk("user/checkToken", async (token) => {
//   try {
//     const response = await axios.get(
//       "https://testapp-server.vercel.app/token",
//       {
//         headers: {
//           authorization: token,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     localStorage.removeItem("token")
//     return "error check token";
//   }
// });

const initialState = {
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
  extraReducers: {
    // signIn ------------------------------
    [signIn.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
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
    // [checkToken.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    // },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export { signIn, signUp };

export const selectDataUser = (state) => state.user.data;

export default userSlice.reducer;
