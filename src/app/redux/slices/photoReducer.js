import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const LOCAL_SERVER = "http://localhost:9400";
const PRODUCTION_SERVER = "https://testapp-server.vercel.app";

const getCards = createAsyncThunk(
  "photos/getCards",
  async ({ setLoading, page, pageSize }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${PRODUCTION_SERVER}/cards?page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      return "error getCards";
    } finally {
      setLoading(false);
    }
  }
);

const likeCard = createAsyncThunk(
  "photos/likeCard",
  async({ id, email }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${PRODUCTION_SERVER}/cards/${id}/likes`, {
        emailUser: email
      });
      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const dislikeCard = createAsyncThunk(
  "photos/dislikeCard",
  async({ id, email }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PRODUCTION_SERVER}/cards/${id}/likes`, {
        data: {
          emailUser: email
        }
        
      });
      return response;
    } catch (error) {
      return rejectWithValue();
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
  pageCount: 1,
  page: 1,
  likes: 0,
};

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: {

    // likeCard ------------------------------
    [likeCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [likeCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const res = action.payload.data

      const indexLikedCard = state.data.findIndex((id) => id === res[0].id);
      if (indexLikedCard !== -1) {
        state.data = [
          ...state.data.slice(0, indexLikedCard),
          res[0],
          ...state.data.slice(indexLikedCard, + 1),
        ]
      }
      // state.data = state.data.filter((card) => {
      // if (card.email !== action.payload) {
      //   state.data.likes.push(action.payload)
      // } 
      // });

    },
    [likeCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    // dislikeCard ------------------------------
    // [dislikeCard.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    [dislikeCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const res = action.payload.data
      const indexDislikeCard = state.data.findIndex((id) => id === res[0].id);
      if (indexDislikeCard !== -1) {
        state.data = [
          ...state.data.slice(0, indexDislikeCard),
          res[0],
          ...state.data.slice(indexDislikeCard, +1),
        ]
      }

    },
    // [dislikeCard.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // },

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
      state.data = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.page = action.payload.page;
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

export { getCards, deleteCard, updateCard, createCard, likeCard, dislikeCard };

export const selectPageCount = (state) => state.photos.pageCount;
export const selectPage = (state) => state.photos.page;

export default photoSlice.reducer;
