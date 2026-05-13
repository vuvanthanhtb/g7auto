import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { depositsService } from "./deposits.service";
import type {
  DepositPayload,
  DepositRequest,
  DepositResponse,
} from "./deposits.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import { parseDepositStatus } from "./deposits.utils";

interface DepositsState {
  depositTable: {
    content: DepositResponse[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
  };
  depositAll: DepositResponse[];
  selected: DepositResponse | null;
}

const initialState: DepositsState = {
  depositTable: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    page: 1,
    size: 10,
  },
  depositAll: [],
  selected: null,
};

export const getAllDeposits = createAsyncThunk(
  "deposits/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await depositsService.getAll();
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getDeposits = createAsyncThunk(
  "deposits/getList",
  async (params: DepositPayload, { rejectWithValue }) => {
    try {
      const { data } = await depositsService.getList(params);
      return {
        ...data,
        content: data.content.map((item: DepositResponse) => ({
          ...item,
          statusDisplay: parseDepositStatus(item.status),
        })),
      };
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getDepositsById = createAsyncThunk(
  "deposits/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await depositsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createDeposits = createAsyncThunk(
  "deposits/create",
  async (data: DepositRequest, { rejectWithValue }) => {
    try {
      const res = await depositsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const refundDeposit = createAsyncThunk(
  "deposits/refund",
  async (
    { id, notes }: { id: number; notes?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await depositsService.refund(id, notes);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const cancelDeposit = createAsyncThunk(
  "deposits/cancel",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await depositsService.cancel(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const convertDepositToContract = createAsyncThunk(
  "deposits/convertToContract",
  async (
    { id, notes }: { id: number; notes?: string },
    { rejectWithValue },
  ) => {
    try {
      await depositsService.convertToContract(id, { notes });
      toastSuccess(SUCCESS_CODE.ACTION);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const exportDeposits = createAsyncThunk(
  "deposits/export",
  async (_, { rejectWithValue }) => {
    try {
      await depositsService.exportExcel();
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const depositsSlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeposits.fulfilled, (state, action) => {
        state.depositAll = action.payload as DepositResponse[];
      })
      .addCase(getDeposits.fulfilled, (state, action) => {
        state.depositTable = action.payload;
      })
      .addCase(getDepositsById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedDeposits } = depositsSlice.actions;
export default depositsSlice.reducer;
