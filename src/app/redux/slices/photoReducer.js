import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const LOCAL_SERVER = "http://localhost:9400";
const PRODUCTION_SERVER = "https://testapp-server.vercel.app";

const getCards = createAsyncThunk(
  "photos/getCards",
  async ({ isLoading, setLoading }) => {
    try {
      const response = await axios.get(`${PRODUCTION_SERVER}/cards`);
      return response.data;
    } catch (error) {
      return "error getCards";
    } finally {
      setLoading(false);
    }
  }
);

const deleteCard = createAsyncThunk(
  "photos/deleteCard",
  async ({ id, ownerId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PRODUCTION_SERVER}/cards/${id}`, {
        ownerId,
      });
      return id;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const updateCard = createAsyncThunk(
  "photos/updateCard",
  async ({ id, title, url }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${PRODUCTION_SERVER}/cards/${id}`, {
        title,
        url,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);
const createCard = createAsyncThunk(
  "photos/createCard",
  async ({ ownerId, title, url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PRODUCTION_SERVER}/cards`, {
        title,
        ownerId,
        url,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: {
    // createCard ------------------------------
    [createCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data.push(action.payload);
    },
    [createCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    // getCards ------------------------------
    [getCards.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCards.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    [getCards.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    // deleteCard ------------------------------
    [deleteCard.pending]: (state, action) => {
      state.isLoading = true;
    },

    [deleteCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = state.data.filter((card) => card.id !== action.payload);
    },
    [deleteCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    // updateCard ------------------------------
    [updateCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { id, ...otherData } = action.payload[0];
      const indexUpdateCard = state.data.findIndex((card) => card.id === id);
      if (indexUpdateCard !== -1) {
        state.data[indexUpdateCard] = { id, ...otherData };
      }
    },
    [updateCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {} = photoSlice.actions;

export { getCards, deleteCard, updateCard, createCard };

export default photoSlice.reducer;
