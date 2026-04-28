import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showroomsService } from "../services/showroom.service";
import type { ShowroomRequest, ShowroomResponse } from "./showroom.type";

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

export const getShowrooms = createAsyncThunk("showrooms/getList", async () => {
  const res = await showroomsService.getList();
  return res.data;
});

export const getAllShowrooms = createAsyncThunk(
  "showrooms/getAll",
  async () => {
    const { data } = await showroomsService.getAll();
    return data;
  },
);

export const getShowroomById = createAsyncThunk(
  "showrooms/getById",
  async (id: number) => {
    const { data } = await showroomsService.getById(id);
    return data;
  },
);

export const createShowroom = createAsyncThunk(
  "showrooms/create",
  async (data: ShowroomRequest) => {
    const { data: response } = await showroomsService.create(data);
    return response;
  },
);

export const updateShowroom = createAsyncThunk(
  "showrooms/update",
  async ({ id, data }: { id: number; data: ShowroomRequest }) => {
    const { data: response } = await showroomsService.update(id, data);
    return response;
  },
);

export const deleteShowroom = createAsyncThunk(
  "showrooms/delete",
  async (id: number) => {
    await showroomsService.delete(id);
    return id;
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
      // .addCase(getShowrooms.fulfilled, (state, action) => {
      //   state.showroomTable = action.payload;
      // })
      .addCase(getAllShowrooms.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.showroomTable = action.payload as any;
      })
      .addCase(getShowroomById.fulfilled, (state, action) => {
        state.selected = action.payload as any;
      });
  },
});

export const { clearSelected: clearSelectedShowroom } = showroomsSlice.actions;
export default showroomsSlice.reducer;
