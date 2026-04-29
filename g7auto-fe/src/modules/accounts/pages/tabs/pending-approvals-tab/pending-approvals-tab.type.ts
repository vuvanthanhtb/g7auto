import type { TablePagination } from "@/libs/types";

export interface AccountPendingSearchForm {
  page?: number;
  size?: number;
  username?: string;
  fullName?: string;
  fromDate?: string;
  toDate?: string;
}

export interface AccountPendingSearchQuery {
  fromDate?: string;
  toDate?: string;
  username?: string;
  fullName?: string;
  page?: number;
  size?: number;
}

export interface AccountPendingTable {
  id: string;
  userId: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  action: string;
  status: string;
  statusApproving: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export type AccountPendingPage = TablePagination<AccountPendingTable>;
