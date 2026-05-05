import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeesService } from "../services/employees.service";
import { employeesApprovingService } from "../services/employees-approving.service";
import type {
  EmployeeQuery,
  EmployeeRequest,
  EmployeeResponse,
  EmployeeApprovingQuery,
} from "./employees.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

type PageState = {
  content: EmployeeResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

interface EmployeesState {
  employeeTable: PageState;
  pendingTable: PageState;
  approvedTable: PageState;
  selected: EmployeeResponse | null;
}

const emptyPage: PageState = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  page: 1,
  size: 10,
};

const initialState: EmployeesState = {
  employeeTable: emptyPage,
  pendingTable: emptyPage,
  approvedTable: emptyPage,
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
  async (
    { id, newShowroomId }: { id: number; newShowroomId: number },
    { rejectWithValue },
  ) => {
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

export const getPendingApprovals = createAsyncThunk(
  "employees/getPending",
  async (params: EmployeeApprovingQuery, { rejectWithValue }) => {
    try {
      const res = await employeesApprovingService.getList({
        ...params,
        statusApproving: "AWAITING_APPROVAL",
      });
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getApprovedApprovals = createAsyncThunk(
  "employees/getApproved",
  async (params: EmployeeApprovingQuery, { rejectWithValue }) => {
    try {
      const res = await employeesApprovingService.getList({
        ...params,
        statusApproving: "APPROVED",
      });
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createEmployeeApproving = createAsyncThunk(
  "employees/createApproving",
  async (data: EmployeeRequest, { rejectWithValue }) => {
    try {
      await employeesApprovingService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const approveEmployeeApproving = createAsyncThunk(
  "employees/approve",
  async (id: number, { rejectWithValue }) => {
    try {
      await employeesApprovingService.approve(id);
      toastSuccess(SUCCESS_CODE.ACTION);
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
      })
      .addCase(getPendingApprovals.fulfilled, (state, action) => {
        state.pendingTable = action.payload;
      })
      .addCase(getApprovedApprovals.fulfilled, (state, action) => {
        state.approvedTable = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
