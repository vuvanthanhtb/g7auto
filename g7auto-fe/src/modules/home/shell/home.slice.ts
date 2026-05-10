import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@/libs/interceptor";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { toastError } from "@/libs/custom-toast";

export interface DashboardStats {
  totalCars: number;
  totalCustomers: number;
  totalContracts: number;
  totalShowrooms: number;
  totalDeposits: number;
  totalQuotations: number;
}

interface HomeState {
  stats: DashboardStats;
}

const initialState: HomeState = {
  stats: {
    totalCars: 0,
    totalCustomers: 0,
    totalContracts: 0,
    totalShowrooms: 0,
    totalDeposits: 0,
    totalQuotations: 0,
  },
};

export const getDashboardStats = createAsyncThunk(
  "home/getDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.call<DashboardStats>({
        url: "/api/dashboard/stats",
        method: "GET",
      });
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardStats.fulfilled, (state, action) => {
      state.stats = action.payload;
    });
  },
});

export default homeSlice.reducer;
