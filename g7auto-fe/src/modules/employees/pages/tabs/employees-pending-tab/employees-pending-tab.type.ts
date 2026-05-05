import type { TablePagination } from "@/libs/types";

export interface EmployeePendingSearchForm {
  fullName?: string;
  page?: number;
  size?: number;
}

export interface EmployeePendingSearchQuery {
  fullName?: string;
  statusApproving?: string;
  page?: number;
  size?: number;
}

export type EmployeePendingPage = TablePagination<Record<string, unknown>>;
