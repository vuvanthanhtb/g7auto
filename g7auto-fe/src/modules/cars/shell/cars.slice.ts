import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carsService } from "../services/cars.service";
import type { CarQuery, CarRequest, CarUpdateRequest, CarResponse } from "./cars.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface CarsState {
  carTable: { content: CarResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  selected: CarResponse | null;
}

const initialState: CarsState = {
  carTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  selected: null,
};

export const getCars = createAsyncThunk(
  "cars/getList",
  async (params: CarQuery, { rejectWithValue }) => {
    try {
      const res = await carsService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCarById = createAsyncThunk(
  "cars/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createCar = createAsyncThunk(
  "cars/create",
  async (data: CarRequest, { rejectWithValue }) => {
    try {
      const res = await carsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateCar = createAsyncThunk(
  "cars/update",
  async ({ id, data }: { id: number; data: CarUpdateRequest }, { rejectWithValue }) => {
    try {
      const res = await carsService.update(id, data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.fulfilled, (state, action) => { state.carTable = action.payload; })
      .addCase(getCarById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedCar } = carsSlice.actions;
export default carsSlice.reducer;
