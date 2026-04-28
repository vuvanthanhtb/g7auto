import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contractsService } from "../services/contracts.service";
import type { ContractQuery, ContractRequest, ContractResponse } from "./contracts.type";

interface ContractsState {
  contractTable: { content: ContractResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: ContractResponse | null;
}

const initialState: ContractsState = {
  contractTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getContracts = createAsyncThunk("contracts/getList", async (params: ContractQuery) => {
  const res = await contractsService.getList(params);
  return res.data;
});

export const getContractsById = createAsyncThunk("contracts/getById", async (id: number) => {
  const res = await contractsService.getById(id);
  return res.data;
});

export const createContracts = createAsyncThunk("contracts/create", async (data: ContractRequest) => {
  const res = await contractsService.create(data);
  return res.data;
});

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContracts.fulfilled, (state, action) => { state.contractTable = action.payload; })
      .addCase(getContractsById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedContracts } = contractsSlice.actions;
export default contractsSlice.reducer;
