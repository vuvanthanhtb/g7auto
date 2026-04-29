import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quotationsService } from "../services/quotations.service";
import type { QuotationQuery, QuotationRequest, QuotationResponse } from "./quotations.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface QuotationsState {
  quotationTable: { content: QuotationResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: QuotationResponse | null;
}

const initialState: QuotationsState = {
  quotationTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getQuotations = createAsyncThunk(
  "quotations/getList",
  async (params: QuotationQuery, { rejectWithValue }) => {
    try {
      const res = await quotationsService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getQuotationsById = createAsyncThunk(
  "quotations/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quotationsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createQuotations = createAsyncThunk(
  "quotations/create",
  async (data: QuotationRequest, { rejectWithValue }) => {
    try {
      const res = await quotationsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const quotationsSlice = createSlice({
  name: "quotations",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuotations.fulfilled, (state, action) => { state.quotationTable = action.payload; })
      .addCase(getQuotationsById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedQuotations } = quotationsSlice.actions;
export default quotationsSlice.reducer;
