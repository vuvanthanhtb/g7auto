import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customersService } from "../services/customers.service";
import type { CustomerQuery, CustomerRequest, CustomerResponse } from "./customers.type";

interface CustomersState {
  customerTable: { content: CustomerResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: CustomerResponse | null;
}

const initialState: CustomersState = {
  customerTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getCustomers = createAsyncThunk("customers/getList", async (params: CustomerQuery) => {
  const res = await customersService.getList(params);
  return res.data;
});

export const getCustomerById = createAsyncThunk("customers/getById", async (id: number) => {
  const res = await customersService.getById(id);
  return res.data;
});

export const createCustomer = createAsyncThunk("customers/create", async (data: CustomerRequest) => {
  const res = await customersService.create(data);
  return res.data;
});

export const updateCustomer = createAsyncThunk("customers/update", async ({ id, data }: { id: number; data: CustomerRequest }) => {
  const res = await customersService.update(id, data);
  return res.data;
});

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
