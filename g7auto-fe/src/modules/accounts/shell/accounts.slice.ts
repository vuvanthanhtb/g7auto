import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AccountResponse } from "./accounts.type";

import { accountsService } from "../services/accounts.service";
import { userApprovesService } from "../services/user-approves.service";
import { getApiErrorMessage } from "@/libs/interceptor/helpers";
import { SUCCESS_CODE } from "@/libs/constants/error-code.constant";
import { toastError, toastSuccess } from "@/libs/custom-toast";
import type {
  AccountPage,
  AccountSearchForm,
} from "../pages/tabs/accounts-list-tab/account-list-tab.type";
import {
  parseAccountsFormSearch,
  parseDataTable,
} from "../pages/tabs/accounts-list-tab/account-list-tab.utils";
import type {
  AccountApprovedPage,
  AccountApprovedSearchForm,
} from "../pages/tabs/accounts-approved-tab/approved-users-tab.type";
import {
  parseApprovedAccountsFormSearch,
  parseApprovalTable,
} from "../pages/tabs/accounts-approved-tab/approved-users-tab.utils";
import {
  parsePendingAccountsFormSearch,
  parsePendingApprovalTable,
} from "../pages/tabs/accounts-pending-tab/pending-approvals-tab.utils";
import type {
  AccountPendingPage,
  AccountPendingSearchForm,
} from "../pages/tabs/accounts-pending-tab/pending-approvals-tab.type";

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

export const getPendingApprovals = createAsyncThunk(
  "accounts/getPending",
  async (params: AccountPendingSearchForm, { rejectWithValue }) => {
    try {
      return await userApprovesService.getPendingApprovals(
        parsePendingAccountsFormSearch(params),
      );
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
        const { content, totalElements, totalPages, page, size } =
          action.payload.data;
        state.accountTable = {
          content: parseDataTable(content ?? []),
          totalElements,
          totalPages,
          page,
          size,
        };
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
