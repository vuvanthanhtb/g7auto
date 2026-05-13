import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carTransfersService } from "../services/car-transfers.service";
import type {
  CarTransferQuery,
  CarTransferRequest,
  CarTransferResponse,
} from "./car-transfers.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import { parseCarTransferStatus } from "./car-transfers.utils";

type PageState = {
  content: CarTransferResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

const emptyPage: PageState = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  page: 1,
  size: 10,
};

interface CarTransfersState {
  carTransferTable: PageState;
  selected: CarTransferResponse | null;
}

const initialState: CarTransfersState = {
  carTransferTable: emptyPage,
  selected: null,
};

export const getCarTransfers = createAsyncThunk(
  "carTransfers/getList",
  async (params: CarTransferQuery, { rejectWithValue }) => {
    try {
      const { data } = await carTransfersService.getList(params);
      return {
        ...data,
        content: data.content.map((item: CarTransferResponse) => ({
          ...item,
          statusDisplay: parseCarTransferStatus(item.status),
        })),
      };
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCarTransfersById = createAsyncThunk(
  "carTransfers/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createCarTransfers = createAsyncThunk(
  "carTransfers/create",
  async (data: CarTransferRequest, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const confirmExportTransfer = createAsyncThunk(
  "carTransfers/confirmExport",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.confirmExport(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const confirmReceiveTransfer = createAsyncThunk(
  "carTransfers/confirmReceive",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.confirmReceive(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const cancelTransfer = createAsyncThunk(
  "carTransfers/cancel",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await carTransfersService.cancel(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const exportCarTransfers = createAsyncThunk(
  "carTransfers/export",
  async (_, { rejectWithValue }) => {
    try {
      await carTransfersService.exportExcel();
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const carTransfersSlice = createSlice({
  name: "carTransfers",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarTransfers.fulfilled, (state, action) => {
        state.carTransferTable = action.payload as any;
      })
      .addCase(getCarTransfersById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(confirmExportTransfer.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(confirmReceiveTransfer.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(cancelTransfer.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedCarTransfers } =
  carTransfersSlice.actions;
export default carTransfersSlice.reducer;
