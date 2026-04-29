import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentsService } from "../services/payments.service";
import type { PaymentQuery, PaymentRequest, PaymentResponse } from "./payments.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface PaymentsState {
  paymentTable: { content: PaymentResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: PaymentResponse | null;
}

const initialState: PaymentsState = {
  paymentTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getPayments = createAsyncThunk(
  "payments/getList",
  async (params: PaymentQuery, { rejectWithValue }) => {
    try {
      const res = await paymentsService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getPaymentsById = createAsyncThunk(
  "payments/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await paymentsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createPayments = createAsyncThunk(
  "payments/create",
  async (data: PaymentRequest, { rejectWithValue }) => {
    try {
      const res = await paymentsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.fulfilled, (state, action) => { state.paymentTable = action.payload; })
      .addCase(getPaymentsById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedPayments } = paymentsSlice.actions;
export default paymentsSlice.reducer;
