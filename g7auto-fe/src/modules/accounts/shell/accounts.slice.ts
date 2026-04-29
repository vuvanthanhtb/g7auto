import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AccountRequest,
  AccountResponse,
  UserApproveQuery,
} from "./accounts.type";

import { accountsService } from "../services/accounts.service";
import { userApprovesService } from "../services/user-approves.service";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import type {
  AccountPage,
  AccountSearchForm,
} from "../pages/tabs/account-list-tab/account-list-tab.type";
import {
  parseAccountsFormSearch,
  parseDataTable,
} from "../pages/tabs/account-list-tab/account-list-tab.utils";
import type {
  AccountApprovedPage,
  AccountApprovedSearchForm,
} from "../pages/tabs/approved-users-tab/approved-users-tab.type";
import {
  parseApprovedAccountsFormSearch,
  parseApprovalTable,
} from "../pages/tabs/approved-users-tab/approved-users-tab.utils";
import { parsePendingApprovalTable } from "../pages/tabs/pending-approvals-tab/pending-approvals-tab.utils";
import type { AccountPendingPage } from "../pages/tabs/pending-approvals-tab/pending-approvals-tab.type";

interface AccountsState {
  accountTable: AccountPage;
  pendingTable: AccountPendingPage;
  approvedTable: AccountApprovedPage;
  selected: AccountResponse | null;
}

const emptyPage = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  page: 1,
  size: 10,
};

const initialState: AccountsState = {
  accountTable: emptyPage,
  pendingTable: emptyPage,
  approvedTable: emptyPage,
  selected: null,
};

export const searchAccounts = createAsyncThunk(
  "accounts/searchAccounts",
  async (params: AccountSearchForm, { rejectWithValue }) => {
    try {
      return await accountsService.searchAccounts(
        parseAccountsFormSearch(params),
      );
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getAccountsById = createAsyncThunk(
  "accounts/getById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await accountsService.getById(id);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const createAccounts = createAsyncThunk(
  "accounts/create",
  async (data: AccountRequest, { rejectWithValue }) => {
    try {
      const res = await accountsService.create(data);
      toastSuccess(SUCCESS_CODE.CREATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const updateAccounts = createAsyncThunk(
  "accounts/update",
  async (
    { id, data }: { id: number; data: Partial<AccountRequest> },
    { rejectWithValue },
  ) => {
    try {
      const res = await accountsService.update(id, data);
      toastSuccess(SUCCESS_CODE.UPDATE);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getPendingApprovals = createAsyncThunk(
  "accounts/getPending",
  async (params: UserApproveQuery, { rejectWithValue }) => {
    try {
      return await userApprovesService.getPendingApprovals(params);
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const getApprovedUsers = createAsyncThunk(
  "accounts/getApproved",
  async (params: AccountApprovedSearchForm, { rejectWithValue }) => {
    try {
      return await userApprovesService.getApprovedUsers(
        parseApprovedAccountsFormSearch(params),
      );
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const changeUserStatus = createAsyncThunk(
  "accounts/changeUserStatus",
  async (
    { username, action }: { username: string; action: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await userApprovesService.changeStatus(username, action);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

export const requestApproval = createAsyncThunk(
  "accounts/requestApproval",
  async (
    { username, action }: { username: string; action: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await userApprovesService.requestApproval(username, action);
      toastSuccess(SUCCESS_CODE.ACTION);
      return res.data;
    } catch (error) {
      toastError(getApiErrorMessage(error));
      return rejectWithValue(error);
    }
  },
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAccounts.fulfilled, (state, action) => {
        const { content, totalElements, totalPages, page, size } = action
          .payload.data as AccountPage;
        state.accountTable = {
          content: parseDataTable(content ?? []),
          totalElements,
          totalPages,
          page,
          size,
        };
      })
      .addCase(getAccountsById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(getPendingApprovals.fulfilled, (state, action) => {
        const { content, totalElements, totalPages, page, size } =
          action.payload.data;
        state.pendingTable = {
          content: parsePendingApprovalTable(content ?? []),
          totalElements,
          totalPages,
          page,
          size,
        };
      })
      .addCase(getApprovedUsers.fulfilled, (state, action) => {
        const { content, totalElements, totalPages, page, size } =
          action.payload.data;
        state.approvedTable = {
          content: parseApprovalTable(content ?? []),
          totalElements,
          totalPages,
          page,
          size,
        };
      });
  },
});

export const { clearSelected: clearSelectedAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
