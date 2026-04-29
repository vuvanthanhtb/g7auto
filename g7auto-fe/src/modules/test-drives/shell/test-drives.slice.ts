import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { testDrivesService } from "../services/test-drives.service";
import type { TestDriveQuery, TestDriveRequest, TestDriveResponse } from "./test-drives.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface TestDrivesState {
  testDriveTable: { content: TestDriveResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: TestDriveResponse | null;
}

const initialState: TestDrivesState = {
  testDriveTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getTestDrives = createAsyncThunk(
  "testDrives/getList",
  async (params: TestDriveQuery, { rejectWithValue }) => {
    try {
      const res = await testDrivesService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getTestDrivesById = createAsyncThunk(
  "testDrives/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await testDrivesService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createTestDrives = createAsyncThunk(
  "testDrives/create",
  async (data: TestDriveRequest, { rejectWithValue }) => {
    try {
      const res = await testDrivesService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const testDrivesSlice = createSlice({
  name: "testDrives",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestDrives.fulfilled, (state, action) => { state.testDriveTable = action.payload; })
      .addCase(getTestDrivesById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedTestDrives } = testDrivesSlice.actions;
export default testDrivesSlice.reducer;
