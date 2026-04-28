import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carTransfersService } from "../services/car-transfers.service";
import type { CarTransferQuery, CarTransferRequest, CarTransferResponse } from "./car-transfers.type";

interface CarTransfersState {
  carTransferTable: { content: CarTransferResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: CarTransferResponse | null;
}

const initialState: CarTransfersState = {
  carTransferTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getCarTransfers = createAsyncThunk("carTransfers/getList", async (params: CarTransferQuery) => {
  const res = await carTransfersService.getList(params);
  return res.data;
});

export const getCarTransfersById = createAsyncThunk("carTransfers/getById", async (id: number) => {
  const res = await carTransfersService.getById(id);
  return res.data;
});

export const createCarTransfers = createAsyncThunk("carTransfers/create", async (data: CarTransferRequest) => {
  const res = await carTransfersService.create(data);
  return res.data;
});

const carTransfersSlice = createSlice({
  name: "carTransfers",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarTransfers.fulfilled, (state, action) => { state.carTransferTable = action.payload; })
      .addCase(getCarTransfersById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedCarTransfers } = carTransfersSlice.actions;
export default carTransfersSlice.reducer;
