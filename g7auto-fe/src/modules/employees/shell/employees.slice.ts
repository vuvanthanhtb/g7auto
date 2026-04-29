import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeesService } from "../services/employees.service";
import type { EmployeeQuery, EmployeeRequest, EmployeeResponse } from "./employees.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

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
  async (params: EmployeeQuery, { rejectWithValue }) => {
    try {
      const res = await employeesService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getEmployeeById = createAsyncThunk(
  "employees/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await employeesService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data: EmployeeRequest, { rejectWithValue }) => {
    try {
      const res = await employeesService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }: { id: number; data: EmployeeRequest }, { rejectWithValue }) => {
    try {
      const res = await employeesService.update(id, data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const resignEmployee = createAsyncThunk(
  "employees/resign",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await employeesService.resign(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const transferEmployeeShowroom = createAsyncThunk(
  "employees/transfer",
  async ({ id, newShowroomId }: { id: number; newShowroomId: number }, { rejectWithValue }) => {
    try {
      const res = await employeesService.transferShowroom(id, newShowroomId);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
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
