import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const LOCAL_SERVER = "http://localhost:9400";
const PRODUCTION_SERVER = "https://testapp-server.vercel.app";

const signIn = createAsyncThunk(
  "user/signIn",
  async ({ password, email }) => {
    try {
      const response = await axios.post(`${PRODUCTION_SERVER}/signin`, {password, email});

      const  {
        token
      } = response.data;
      localStorage.setItem("token", `Bearer ${token}`)

      return response.data;
    } catch (error) {
      return "error getCards";
    }
  }
);

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  };

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
      // getCards ------------------------------
      [signIn.pending]: (state, action) => {
        state.isLoading = true;
      },
      [signIn.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
      },
      [signIn.rejected]: (state, action) => {
        state.isLoading = false;
        state.isError = true;
      },
  
     
    },
  });
  
  export const {} = userSlice.actions;
  
  export { signIn };
  
  export const selectPageCount = (state) => state.photos.pageCount;
  export const selectPage = (state) => state.photos.page;
  
  export default userSlice.reducer;