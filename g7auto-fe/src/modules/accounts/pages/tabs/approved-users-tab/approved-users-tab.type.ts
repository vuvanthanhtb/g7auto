import type { TablePagination } from "@/libs/types";

export interface AccountApprovedSearchForm {
  page?: number;
  size?: number;
  username?: string;
  fullName?: string;
  statusApproving?: Record<string, string>;
  fromDate?: string;
  toDate?: string;
}

export interface AccountApprovedSearchQuery {
  fromDate?: string;
  toDate?: string;
  username?: string;
  fullName?: string;
  statusApproving?: string;
  page?: number;
  size?: number;
}

export interface AccountApprovedTable {
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

export type AccountApprovedPage = TablePagination<AccountApprovedTable>;
