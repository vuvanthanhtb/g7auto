import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AccountQuery,
  AccountRequest,
  AccountResponse,
  AccountTableResponse,
  UserApproveQuery,
  UserApproveResponse,
} from "./accounts.type";

import { accountsService } from "../services/accounts.service";
import { userApprovesService } from "../services/user-approves.service";

type PagedTable<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

interface AccountsState {
  accountTable: PagedTable<AccountTableResponse>;
  pendingTable: PagedTable<UserApproveResponse>;
  approvedTable: PagedTable<UserApproveResponse>;
  selected: AccountResponse | null;
}

const emptyPage = <T>(): PagedTable<T> => ({
  content: [],
  totalElements: 0,
  totalPages: 0,
  page: 1,
  size: 10,
});

const initialState: AccountsState = {
  accountTable: emptyPage<AccountTableResponse>(),
  pendingTable: emptyPage<UserApproveResponse>(),
  approvedTable: emptyPage<UserApproveResponse>(),
  selected: null,
};

export const searchAccounts = createAsyncThunk(
  "accounts/searchAccounts",
  async (params: AccountQuery) => {
    const response = await accountsService.searchAccounts(params);
    return {
      ...response.data,
      content: response.data.content.map((item: AccountTableResponse) => ({
        ...item,
        role: item.roles.join(", "),
      })),
    };
  },
);

export const getAccountsById = createAsyncThunk(
  "accounts/getById",
  async (id: number) => {
    const res = await accountsService.getById(id);
    return res.data;
  },
);

export const createAccounts = createAsyncThunk(
  "accounts/create",
  async (data: AccountRequest) => {
    const res = await accountsService.create(data);
    return res.data;
  },
);

export const updateAccounts = createAsyncThunk(
  "accounts/update",
  async ({ id, data }: { id: number; data: Partial<AccountRequest> }) => {
    const res = await accountsService.update(id, data);
    return res.data;
  },
);

export const getPendingApprovals = createAsyncThunk(
  "accounts/getPending",
  async (params: UserApproveQuery) => {
    const res = await userApprovesService.getUserApprovals({ ...params, status: "PENDING" });
    return res.data;
  },
);

export const getApprovedUsers = createAsyncThunk(
  "accounts/getApproved",
  async (params: UserApproveQuery) => {
    const res = await userApprovesService.getUserApprovals({ ...params, status: "APPROVED" });
    return res.data;
  },
);

export const approveUser = createAsyncThunk(
  "accounts/approve",
  async (id: string) => {
    const res = await userApprovesService.approveUser(id);
    return res.data;
  },
);

export const rejectUser = createAsyncThunk(
  "accounts/reject",
  async (id: string) => {
    const res = await userApprovesService.rejectUser(id);
    return res.data;
  },
);

export const lockAccount = createAsyncThunk(
  "accounts/lock",
  async (id: number) => {
    const res = await accountsService.lock(id);
    return res.data;
  },
);

export const unlockAccount = createAsyncThunk(
  "accounts/unlock",
  async (id: number) => {
    const res = await accountsService.unlock(id);
    return res.data;
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
        state.accountTable = action.payload;
      })
      .addCase(getAccountsById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(getPendingApprovals.fulfilled, (state, action) => {
        state.pendingTable = action.payload;
      })
      .addCase(getApprovedUsers.fulfilled, (state, action) => {
        state.approvedTable = action.payload;
      });
  },
});

export const { clearSelected: clearSelectedAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;
