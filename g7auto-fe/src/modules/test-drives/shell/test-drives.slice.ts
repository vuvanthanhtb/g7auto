import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { testDrivesService } from "../services/test-drives.service";
import type { TestDriveQuery, TestDriveRequest, TestDriveResponse } from "./test-drives.type";

interface TestDrivesState {
  testDriveTable: { content: TestDriveResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: TestDriveResponse | null;
}

const initialState: TestDrivesState = {
  testDriveTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getTestDrives = createAsyncThunk("testDrives/getList", async (params: TestDriveQuery) => {
  const res = await testDrivesService.getList(params);
  return res.data;
});

export const getTestDrivesById = createAsyncThunk("testDrives/getById", async (id: number) => {
  const res = await testDrivesService.getById(id);
  return res.data;
});

export const createTestDrives = createAsyncThunk("testDrives/create", async (data: TestDriveRequest) => {
  const res = await testDrivesService.create(data);
  return res.data;
});

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
