import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeesService } from "../services/employees.service";
import type {
  EmployeeQuery,
  EmployeeRequest,
  EmployeeResponse,
} from "./employees.type";

interface EmployeesState {
  employeeTable: {
    content: EmployeeResponse[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
  };
  selected: EmployeeResponse | null;
}

const initialState: EmployeesState = {
  employeeTable: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    page: 1,
    size: 10,
  },
  selected: null,
};

export const getEmployees = createAsyncThunk(
  "employees/getList",
  async (params: EmployeeQuery) => {
    const res = await employeesService.getList(params);
    return res.data;
  },
);

export const getEmployeeById = createAsyncThunk(
  "employees/getById",
  async (id: number) => {
    const res = await employeesService.getById(id);
    return res.data;
  },
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data: EmployeeRequest) => {
    const res = await employeesService.create(data);
    return res.data;
  },
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }: { id: number; data: EmployeeRequest }) => {
    const res = await employeesService.update(id, data);
    return res.data;
  },
);

export const resignEmployee = createAsyncThunk(
  "employees/resign",
  async (id: number) => {
    const res = await employeesService.resign(id);
    return res.data;
  },
);

export const transferEmployeeShowroom = createAsyncThunk(
  "employees/transfer",
  async ({ id, newShowroomId }: { id: number; newShowroomId: number }) => {
    const res = await employeesService.transferShowroom(id, newShowroomId);
    return res.data;
  },
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.employeeTable = action.payload;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
