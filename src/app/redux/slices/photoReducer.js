import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const PRODUCTION_SERVER = "https://testapp-server.vercel.app";
const getHeaders = () => {
  return {
    authorization: localStorage.getItem("token"),
  };
};

const getCards = createAsyncThunk(
  "photos/getCards",
  async ({ page, pageSize, title = "" }) => {
    try {
      const response = await axios.get(
        `${PRODUCTION_SERVER}/cards?pageSize=${pageSize}&page=${page}&title=${title}`,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const likeCard = createAsyncThunk(
  "photos/likeCard",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${PRODUCTION_SERVER}/cards/${id}/likes`,
        {},
        {
          headers: getHeaders(),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const dislikeCard = createAsyncThunk(
  "photos/dislikeCard",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PRODUCTION_SERVER}/cards/${id}/likes`, {
        headers: getHeaders(),
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
        headers: getHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const updateCard = createAsyncThunk(
  "photos/updateCard",
  async ({ id, title, description, url }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${PRODUCTION_SERVER}/cards/${id}`,
        {
          title,
          description,
          url,
        },
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const createCard = createAsyncThunk(
  "photos/createCard",
  async ({ ownerId, title, description, url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${PRODUCTION_SERVER}/cards`,
        {
          title,
          description,
          ownerId,
          url,
        },
        {
          headers: getHeaders(),
        }
      );

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
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {
    // likeCard ------------------------------
    [likeCard.pending]: (state, action) => {},
    [likeCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const res = action.payload.data;

      const indexLikedCard = state.data.findIndex((card) => card.id === res[0].id);
      if (indexLikedCard !== -1) {
        state.data = [
          ...state.data.slice(0, indexLikedCard),
          res[0],
          ...state.data.slice(indexLikedCard + 1),
        ];
      }
    },
    [likeCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    // dislikeCard ------------------------------
    [dislikeCard.pending]: (state, action) => {},
    [dislikeCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const res = action.payload.data;
      const indexDislikeCard = state.data.findIndex((card) => card.id === res[0].id);
      if (indexDislikeCard !== -1) {
        state.data = [
          ...state.data.slice(0, indexDislikeCard),
          res[0],
          ...state.data.slice(indexDislikeCard + 1),
        ];
      }
    },
    [dislikeCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },

    // createCard ------------------------------
    [createCard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
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
      toast("Карточка успешно удалена");
    },
    [deleteCard.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast("Карточку не получилось удалить !!!");
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

export const { setPage } = photoSlice.actions;

export { getCards, deleteCard, updateCard, createCard, likeCard, dislikeCard };

export const selectPageCount = (state) => state.photos.pageCount;
export const selectPage = (state) => state.photos.page;
export const selectIsLoading = (state) => state.photos.isLoading;
export const selectData = (state) => state.photos.data;

export default photoSlice.reducer;
