import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { depositsService } from "../services/deposits.service";
import type { DepositQuery, DepositRequest, DepositResponse } from "./deposits.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface DepositsState {
  depositTable: { content: DepositResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: DepositResponse | null;
}

const initialState: DepositsState = {
  depositTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getDeposits = createAsyncThunk(
  "deposits/getList",
  async (params: DepositQuery, { rejectWithValue }) => {
    try {
      const res = await depositsService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getDepositsById = createAsyncThunk(
  "deposits/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await depositsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createDeposits = createAsyncThunk(
  "deposits/create",
  async (data: DepositRequest, { rejectWithValue }) => {
    try {
      const res = await depositsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const depositsSlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeposits.fulfilled, (state, action) => { state.depositTable = action.payload; })
      .addCase(getDepositsById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedDeposits } = depositsSlice.actions;
export default depositsSlice.reducer;
