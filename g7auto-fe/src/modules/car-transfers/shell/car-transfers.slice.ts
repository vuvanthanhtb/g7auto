import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carTransfersService } from "../services/car-transfers.service";
import type { CarTransferQuery, CarTransferRequest, CarTransferResponse } from "./car-transfers.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface CarTransfersState {
  carTransferTable: { content: CarTransferResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: CarTransferResponse | null;
}

const initialState: CarTransfersState = {
  carTransferTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getCarTransfers = createAsyncThunk(
  "carTransfers/getList",
  async (params: CarTransferQuery, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCarTransfersById = createAsyncThunk(
  "carTransfers/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createCarTransfers = createAsyncThunk(
  "carTransfers/create",
  async (data: CarTransferRequest, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

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
