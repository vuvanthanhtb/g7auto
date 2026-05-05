import type { TablePagination } from "@/libs/types";

export interface EmployeeApprovedSearchForm {
  fullName?: string;
  page?: number;
  size?: number;
}

export interface EmployeeApprovedSearchQuery {
  fullName?: string;
  statusApproving?: string;
  page?: number;
  size?: number;
}

export type EmployeeApprovedPage = TablePagination<Record<string, unknown>>;
