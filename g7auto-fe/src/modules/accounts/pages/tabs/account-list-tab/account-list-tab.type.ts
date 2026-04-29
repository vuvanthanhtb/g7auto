import type { TablePagination } from "@/libs/types";

export interface AccountTable {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface AccountSearchForm {
  page?: number;
  size?: number;
  username?: string;
  fullName?: string;
  status?: Record<string, string>;
  role?: Record<string, string>;
  fromDate?: string;
  toDate?: string;
}

export interface AccountSearchQuery {
  fromDate?: string;
  toDate?: string;
  username?: string;
  fullName?: string;
  status?: string;
  role?: string;
  page?: number;
  size?: number;
}

export type AccountPage = TablePagination<AccountTable>;
