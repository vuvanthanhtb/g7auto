import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showroomsService } from "../services/showroom.service";
import type { ShowroomRequest, ShowroomResponse } from "./showroom.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface ShowroomsState {
  showroomTable: {
    content: ShowroomResponse[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
  };
  showroomAll: ShowroomResponse[];
  selected: ShowroomResponse | null;
}

const initialState: ShowroomsState = {
  showroomTable: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    page: 1,
    size: 10,
  },
  showroomAll: [],
  selected: null,
};

export const getShowrooms = createAsyncThunk(
  "showrooms/getList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await showroomsService.search();
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getAllShowrooms = createAsyncThunk(
  "showrooms/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await showroomsService.getAll();
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getShowroomById = createAsyncThunk(
  "showrooms/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await showroomsService.getById(id);
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createShowroom = createAsyncThunk(
  "showrooms/create",
  async (data: ShowroomRequest, { rejectWithValue }) => {
    try {
      const { data: response } = await showroomsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return response;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateShowroom = createAsyncThunk(
  "showrooms/update",
  async (
    { id, data }: { id: number; data: ShowroomRequest },
    { rejectWithValue },
  ) => {
    try {
      const { data: response } = await showroomsService.update(id, data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return response;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteShowroom = createAsyncThunk(
  "showrooms/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await showroomsService.delete(id);
      toastSuccess(SUCCESS_CODE.DELETE);
      return id;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const showroomsSlice = createSlice({
  name: "showrooms",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShowrooms.fulfilled, (state, action) => {
        state.showroomAll = action.payload as any;
      })
      .addCase(getShowroomById.fulfilled, (state, action) => {
        state.selected = action.payload as any;
      });
  },
});

export const { clearSelected: clearSelectedShowroom } = showroomsSlice.actions;
export default showroomsSlice.reducer;
