import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { depositsService } from "../services/deposits.service";
import type { DepositQuery, DepositRequest, DepositResponse } from "./deposits.type";

interface DepositsState {
  depositTable: { content: DepositResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: DepositResponse | null;
}

const initialState: DepositsState = {
  depositTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getDeposits = createAsyncThunk("deposits/getList", async (params: DepositQuery) => {
  const res = await depositsService.getList(params);
  return res.data;
});

export const getDepositsById = createAsyncThunk("deposits/getById", async (id: number) => {
  const res = await depositsService.getById(id);
  return res.data;
});

export const createDeposits = createAsyncThunk("deposits/create", async (data: DepositRequest) => {
  const res = await depositsService.create(data);
  return res.data;
});

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
