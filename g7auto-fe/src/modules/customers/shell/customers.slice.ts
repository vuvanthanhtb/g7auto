import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customersService } from "../services/customers.service";
import type { CustomerQuery, CustomerRequest, CustomerResponse } from "./customers.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface CustomersState {
  customerTable: { content: CustomerResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: CustomerResponse | null;
}

const initialState: CustomersState = {
  customerTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getCustomers = createAsyncThunk(
  "customers/getList",
  async (params: CustomerQuery, { rejectWithValue }) => {
    try {
      const res = await customersService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCustomerById = createAsyncThunk(
  "customers/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await customersService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data: CustomerRequest, { rejectWithValue }) => {
    try {
      const res = await customersService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }: { id: number; data: CustomerRequest }, { rejectWithValue }) => {
    try {
      const res = await customersService.update(id, data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.fulfilled, (state, action) => { state.customerTable = action.payload; })
      .addCase(getCustomerById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedCustomer } = customersSlice.actions;
export default customersSlice.reducer;
