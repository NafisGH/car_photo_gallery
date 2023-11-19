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
  async (
    { page, pageSize, title = "" }: { page: number; pageSize: number; title: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${PRODUCTION_SERVER}/cards?pageSize=${pageSize}&page=${page}&title=${title}`,
        {
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const likeCard = createAsyncThunk(
  "photos/likeCard",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${PRODUCTION_SERVER}/cards/${id}/likes`,
        {},
        {
          headers: getHeaders(),
        }
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const dislikeCard = createAsyncThunk(
  "photos/dislikeCard",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PRODUCTION_SERVER}/cards/${id}/likes`, {
        headers: getHeaders(),
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteCard = createAsyncThunk(
  "photos/deleteCard",
  async ({ id, ownerId }: { id: number; ownerId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PRODUCTION_SERVER}/cards/${id}`, {
        data: ownerId,
        headers: getHeaders(),
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const updateCard = createAsyncThunk(
  "photos/updateCard",
  async (
    {
      id,
      title,
      description,
      url,
    }: { id: number; title: string; description: string; url: string },
    { rejectWithValue }
  ) => {
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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const createCard = createAsyncThunk(
  "photos/createCard",
  async (
    {
      ownerId,
      title,
      description,
      url,
    }: { ownerId: number; title: string; description: string; url: string },
    { rejectWithValue }
  ) => {
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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export type initialStateType = {
  photos: any;
  data: any[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  pageCount: number;
  page: number;
  likes: number;
};

const initialState: initialStateType = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  pageCount: 1,
  page: 1,
  likes: 0,
  photos: undefined,
};

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(likeCard.pending, (state, action) => {});
    builder.addCase(likeCard.fulfilled, (state, action) => {
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
    });
    builder.addCase(likeCard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // dislikeCard ------------------------------
    builder.addCase(dislikeCard.pending, (state, action) => {});
    builder.addCase(dislikeCard.fulfilled, (state, action) => {
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
    });
    builder.addCase(dislikeCard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // createCard ------------------------------
    builder.addCase(createCard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createCard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // getCards ------------------------------
    builder.addCase(getCards.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload.data;
      state.pageCount = action.payload.pageCount;
      state.page = action.payload.page;
    });
    builder.addCase(getCards.rejected, (state, action) => {
      state.isLoading = true;
    });

    // deleteCard ------------------------------
    builder.addCase(deleteCard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = state.data.filter((card) => card.id !== action.payload);
      toast("Карточка успешно удалена");
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast("Карточку не получилось удалить !!!");
    });
    // updateCard ------------------------------
    builder.addCase(updateCard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { id, ...otherData } = action.payload[0];
      const indexUpdateCard = state.data.findIndex((card) => card.id === id);
      if (indexUpdateCard !== -1) {
        state.data[indexUpdateCard] = { id, ...otherData };
      }
    });
    builder.addCase(updateCard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setPage } = photoSlice.actions;

export { getCards, deleteCard, updateCard, createCard, likeCard, dislikeCard };

export const selectPageCount = (state: initialStateType) => state.photos.pageCount;
export const selectPage = (state: initialStateType) => state.photos.page;
export const selectIsLoading = (state: initialStateType) => state.photos.isLoading;
export const selectData = (state: initialStateType) => state.photos.data;

export default photoSlice.reducer;
