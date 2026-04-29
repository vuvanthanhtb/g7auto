import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceHistoryService } from "../services/service-history.service";
import type { ServiceHistoryQuery, ServiceHistoryRequest, ServiceHistoryResponse } from "./service-history.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface ServiceHistoryState {
  serviceHistoryTable: { content: ServiceHistoryResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: ServiceHistoryResponse | null;
}

const initialState: ServiceHistoryState = {
  serviceHistoryTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getServiceHistory = createAsyncThunk(
  "serviceHistory/getList",
  async (params: ServiceHistoryQuery, { rejectWithValue }) => {
    try {
      const res = await serviceHistoryService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getServiceHistoryById = createAsyncThunk(
  "serviceHistory/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await serviceHistoryService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createServiceHistory = createAsyncThunk(
  "serviceHistory/create",
  async (data: ServiceHistoryRequest, { rejectWithValue }) => {
    try {
      const res = await serviceHistoryService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const serviceHistorySlice = createSlice({
  name: "serviceHistory",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceHistory.fulfilled, (state, action) => { state.serviceHistoryTable = action.payload; })
      .addCase(getServiceHistoryById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedServiceHistory } = serviceHistorySlice.actions;
export default serviceHistorySlice.reducer;
