import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contractsService } from "../services/contracts.service";
import type { ContractQuery, ContractRequest, ContractResponse } from "./contracts.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface ContractsState {
  contractTable: { content: ContractResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: ContractResponse | null;
}

const initialState: ContractsState = {
  contractTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getContracts = createAsyncThunk(
  "contracts/getList",
  async (params: ContractQuery, { rejectWithValue }) => {
    try {
      const res = await contractsService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getContractsById = createAsyncThunk(
  "contracts/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await contractsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createContracts = createAsyncThunk(
  "contracts/create",
  async (data: ContractRequest, { rejectWithValue }) => {
    try {
      const res = await contractsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

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
