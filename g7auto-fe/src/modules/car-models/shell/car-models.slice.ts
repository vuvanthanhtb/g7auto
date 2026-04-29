import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carModelsService } from "../services/car-model.service";
import type { CarModelQuery, CarModelRequest, CarModelResponse } from "./car-model.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";

interface CarModelsState {
  carModelTable: { content: CarModelResponse[]; totalElements: number; totalPages: number; page: number; size: number };
  carModelAll: CarModelResponse[];
  selected: CarModelResponse | null;
}

const initialState: CarModelsState = {
  carModelTable: { content: [], totalElements: 0, totalPages: 0, page: 1, size: 10 },
  carModelAll: [],
  selected: null,
};

export const getCarModels = createAsyncThunk(
  "carModels/getList",
  async (params: CarModelQuery, { rejectWithValue }) => {
    try {
      const res = await carModelsService.getList(params);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getAllCarModels = createAsyncThunk(
  "carModels/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await carModelsService.getAll();
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCarModelById = createAsyncThunk(
  "carModels/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carModelsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createCarModel = createAsyncThunk(
  "carModels/create",
  async (data: CarModelRequest, { rejectWithValue }) => {
    try {
      const res = await carModelsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateCarModel = createAsyncThunk(
  "carModels/update",
  async ({ id, data }: { id: number; data: CarModelRequest }, { rejectWithValue }) => {
    try {
      const res = await carModelsService.update(id, data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteCarModel = createAsyncThunk(
  "carModels/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await carModelsService.delete(id);
      toastSuccess(SUCCESS_CODE.DELETE);
      return id;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const carModelsSlice = createSlice({
  name: "carModels",
  initialState,
  reducers: {
    clearSelected: (state) => { state.selected = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarModels.fulfilled, (state, action) => { state.carModelTable = action.payload; })
      .addCase(getAllCarModels.fulfilled, (state, action) => { state.carModelAll = action.payload as unknown as CarModelResponse[]; })
      .addCase(getCarModelById.fulfilled, (state, action) => { state.selected = action.payload; });
  },
});

export const { clearSelected: clearSelectedCarModel } = carModelsSlice.actions;
export default carModelsSlice.reducer;
