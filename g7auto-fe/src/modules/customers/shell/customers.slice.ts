import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customersService } from "./customers.service";
import type {
  CustomerRequest,
  CustomerResponse,
  CustomerSearchForm,
  CustomerExportPayload,
} from "./customers.type";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import { formatPhoneNumber } from "@/libs/utils";
import { parseCustomerSearch } from "../pages/customers.utils";

type PageState = {
  content: CustomerResponse[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

interface CustomersState {
  customerTable: PageState;
  customerAll: CustomerResponse[];
  selected: CustomerResponse | null;
}

const emptyPage: PageState = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  page: 1,
  size: 10,
};

const initialState: CustomersState = {
  customerTable: emptyPage,
  customerAll: [],
  selected: null,
};

export const getAllCustomers = createAsyncThunk(
  "customers/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await customersService.getAll();
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCustomers = createAsyncThunk(
  "customers/getList",
  async (params: CustomerSearchForm, { rejectWithValue }) => {
    try {
      const { data } = await customersService.getList(
        parseCustomerSearch(params),
      );
      return {
        ...data,
        content: data.content.map((item) => ({
          ...item,
          phoneDisplay: formatPhoneNumber(item?.phone || ""),
        })),
      };
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getCustomerById = createAsyncThunk(
  "customers/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await customersService.getById(id);
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data: CustomerRequest, { rejectWithValue }) => {
    try {
      await customersService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (
    { id, data }: { id: number; data: CustomerRequest },
    { rejectWithValue },
  ) => {
    try {
      await customersService.update(id, data);
      toastSuccess(SUCCESS_CODE.ACTION);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await customersService.delete(id);
      toastSuccess(SUCCESS_CODE.ACTION);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const exportCustomers = createAsyncThunk(
  "customers/export",
  async (params: CustomerExportPayload, { rejectWithValue }) => {
    try {
      await customersService.export(params);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const importCustomers = createAsyncThunk(
  "customers/import",
  async (file: File, { rejectWithValue }) => {
    try {
      const { data } = await customersService.importFile(file);
      return data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const downloadCustomerTemplate = createAsyncThunk(
  "customers/downloadTemplate",
  async (_, { rejectWithValue }) => {
    try {
      await customersService.downloadTemplate();
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.customerAll = action.payload as CustomerResponse[];
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customerTable = action.payload;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedCustomer } = customersSlice.actions;
export default customersSlice.reducer;
