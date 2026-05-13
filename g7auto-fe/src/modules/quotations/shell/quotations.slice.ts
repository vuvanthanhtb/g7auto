import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { quotationsService } from "./quotations.service";
import type {
  QuotationPayload,
  QuotationRequest,
  QuotationResponse,
} from "./quotations.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import { parseQuotationStatus } from "./quotations.utils";

interface QuotationsState {
  quotationTable: {
    content: QuotationResponse[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
  };
  quotationAll: QuotationResponse[];
  selected: QuotationResponse | null;
}

const initialState: QuotationsState = {
  quotationTable: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    page: 1,
    size: 10,
  },
  quotationAll: [],
  selected: null,
};

export const getAllQuotations = createAsyncThunk(
  "quotations/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await quotationsService.getAll();
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getQuotations = createAsyncThunk(
  "quotations/getList",
  async (params: QuotationPayload, { rejectWithValue }) => {
    try {
      const res = await quotationsService.getList(params);
      return {
        ...res.data,
        content: res.data.content.map((item: QuotationResponse) => ({
          ...item,
          statusDisplay: parseQuotationStatus(item.status),
        })),
      };
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getQuotationsById = createAsyncThunk(
  "quotations/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quotationsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createQuotations = createAsyncThunk(
  "quotations/create",
  async (data: QuotationRequest, { rejectWithValue }) => {
    try {
      const res = await quotationsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const sendQuotation = createAsyncThunk(
  "quotations/send",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quotationsService.send(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const acceptQuotation = createAsyncThunk(
  "quotations/accept",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quotationsService.accept(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const cancelQuotation = createAsyncThunk(
  "quotations/cancel",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await quotationsService.cancel(id);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const exportQuotations = createAsyncThunk(
  "quotations/export",
  async (_, { rejectWithValue }) => {
    try {
      await quotationsService.exportExcel();
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const quotationsSlice = createSlice({
  name: "quotations",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuotations.fulfilled, (state, action) => {
        state.quotationAll = action.payload as QuotationResponse[];
      })
      .addCase(getQuotations.fulfilled, (state, action) => {
        state.quotationTable = action.payload;
      })
      .addCase(getQuotationsById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedQuotations } =
  quotationsSlice.actions;
export default quotationsSlice.reducer;
